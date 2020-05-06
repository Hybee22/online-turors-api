const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')


const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, 'Please provide a user name'],
            unique: true
        },
        firstName: {
            type: String,
            required: [true, 'Please provide a first name']
        },
        lastName: {
            type: String,
            required: [true, 'Please provide a last name']
        },
        email: {
            type: String,
            required: [true, 'Please provide an email.'],
            unique: true,
            lowercase: true,
            validate: {
                validator: function(el) {
                    return validator.isEmail(el)
                }, 
                message: 'Please provide a valid email'}
        },
        role: {
            type: String,
            enum: ['student', 'tutor', 'admin'],
            default: 'student'
        },
        password: {
            type: String,
            required: [true, 'Please provide a password.'],
            minlength: 8,
            select: false
        },
        passwordConfirm: {
            type: String,
            required: [true, 'Please confirm your password.'],
            validate: {
                validator: function(el) {
                    return el === this.password
                },
                message: 'Passwords do not match'
            }
        },    
        active: {
            type: Boolean,
            default: true,
            select: false
        },
        createdAt: {
            type: Date,
            default: Date.now()
        }
    }, 
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
)

userSchema.index({ firstName: "text" })

userSchema.virtual('lessons', {
    ref: 'Booking',
    foreignField: 'student',
    localField: '_id'
})

userSchema.pre('save', async function(next) {
    // If password was modified
    if (!this.isModified('password')) return next()

    // Hash the password
    this.password = await bcrypt.hash(this.password, 12)

    // Remove passwordConfirm from persisting
    this.passwordConfirm = undefined

    next()
})

// Removes deactivated user {active: false} from being returned in a find query
userSchema.pre(/^find/, function(next) {
    this.find({ active: { $ne: false }})
    next()
})

// Instance method to compare password for login
userSchema.methods.correctPassword = function(candidatePassword, userPassword) {
    return bcrypt.compare(candidatePassword, userPassword)
}


const User = mongoose.model('User', userSchema)
module.exports = User