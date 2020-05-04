const { promisify } = require('util')
const jwt = require('jsonwebtoken')
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/appError')

const signToken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN })
}

const createSendToken = (user, statusCode, res) => {
    const token = signToken(user._id)

    const cookieOptions = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
        secure: true,
        httpOnly: true
    }

    if (process.env.NODE_ENV === 'production') cookieOptions.secure = true

    user.password = undefined

    res.cookie('jwt', token, cookieOptions)

    res.status(statusCode).json({
        status: 'success',
        token,
        data: {
            user
        }
    })
}

exports.signup = catchAsync( async (req, res, next) => {
    if (req.body.role === 'admin') {
        return next(
            new AppError('You cannot register as an admin on the platform', 400)
        )
    }

    const newUser = await User.create({
        username: req.body.username,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        role: req.body.role,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm,
    })

    createSendToken(newUser, 201, res)
})

exports.login = catchAsync( async (req, res, next) => {
    const { email, password } = req.body

    // Check if email and password exists
    if (!email || !password) {
        return next(new AppError('Please provide email and password!', 400))
    }

    // Check if the user exists and password correct
    const user = await User.findOne({ email }).select('+password').select('-createdAt -__v')

    if (!user || !(await user.correctPassword(password, user.password))) {
        return next(new AppError('Incorrect email or password', 401))
    }

    // If all true, send token to user
    createSendToken(user, 200, res)
})

exports.protect = catchAsync( async (req, res, next) => {
    let token;

    // Get token from request header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1]
    }
    // If token doesn't exist
    if (!token) {
        return next(new AppError('You are not logged in!. Please login to gain access', 401)) // 401 - Unauthorised
    }
    // Token verification
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET)

    // Check if user still exists
    const currentUser = await User.findById(decoded.id)
    if (!currentUser) {
        return next(
            new AppError('This user no longer exist', 401)
        )
    }

    // Grant user access to route
    req.user = currentUser
    next()
})

// Restricting Access
exports.restrictTo = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(
                new AppError('You do not have permission to perform this action', 403)
            )
        }
        next()
    }
}

// user.role = 'student'
// ['admin', 'tutor'].includes(user.role) -- false 
// (!['admin', 'tutor']).includes(user.role) -- true 