const RegisterSubject = require('../models/registerSubjectModel')
// const Subject = require('../models/subjectModel')
const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/appError')

exports.registerSubject = catchAsync( async (req, res, next) => {

    const doc = await RegisterSubject.create({
        tutor: req.body.tutor,
        subject: req.body.subject,
        category: req.body.category
    })

    res.status(201).json({
        status: 'success',
        data: {
            data: doc
        }
    })
})

// 

exports.getAllRegisteredSubject = catchAsync( async (req, res, next) => {
    const registered = await RegisterSubject.find({ tutor: req.user.id }).populate({
        path: 'subject',
        select: '-__v'
    })
    .select('-registered -tutor -createdAt -user -__v')
    
    let registeredSubject = [];
    registered.forEach(el => {
      return registeredSubject.push(el.subject)
    })

    res.status(200).json({
        status: 'success',
        data: {
            data: registeredSubject
        }
    })
})

exports.getRegisteredSubject = catchAsync( async (req, res, next) => {
    const subject = await RegisterSubject.findById(req.params.id)
    .select('-registered -createdAt -__v')
    .populate({
        path: 'subject',
        select: '-__v -category'
    })
    .populate({
        path: 'category',
        select: 'name'
    })
    if (!subject) {
        return next(
            new AppError('No document with this ID found', 404)
        )
    }

    res.status(200).json({
        status: 'success',
        data: {
            data: subject
        }
    })
})

exports.updateRegisteredSubject = catchAsync( async (req, res, next) => {
    const updatedDoc = await RegisterSubject.findByIdAndUpdate(req.params.id, req.body, { new: true })

    if (!updatedDoc) {
        return next(
            new AppError('No document with this ID found', 404)
        )
    }

    res.status(200).json({
        status: 'success',
        data: {
            data: updatedDoc
        }
    })
})

exports.deleteRegisteredSubject = catchAsync( async (req, res, next) => {
    const deletedDoc = await RegisterSubject.findByIdAndDelete(req.params.id)

    if (!deletedDoc) {
        return next(
            new AppError('No document with this ID found', 404)
        )
    }

    res.status(204).json({
        status: 'success',
        data: {
            data: deletedDoc
        }
    })
})