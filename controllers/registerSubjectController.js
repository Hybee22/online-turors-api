const RegisterSubject = require('../models/registerSubjectModel')
const Subject = require('../models/subjectModel')
const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/appError')

exports.registerSubject = catchAsync( async (req, res, next) => {
    const doc = await RegisterSubject.create({
        user: req.body.user,
        subject: req.body.subject,
        category: req.body.category
    })

    const subject = await Subject.findById(req.body.subject)
    subject.tutors.push(req.user.id)
    subject.save()


    if (!doc) {
        return next(
            new AppError('No document with this ID found', 404)
        )
    }

    res.status(201).json({
        status: 'success',
        data: {
            data: doc
        }
    })
})

exports.getAllRegisteredSubject = catchAsync( async (req, res, next) => {
    const registered = await RegisterSubject.find().select('-registered -user -category -__v')

    res.status(200).json({
        status: 'success',
        data: {
            data: registered
        }
    })
})

exports.updateRegisteredSubject = catchAsync( async (req, res, next) => {
    const updatedDoc = await RegisterSubject.findByIdAndUpdate(req.params.id, req.body).select('-registered -user -category -__v')

    res.status(200).json({
        status: 'success',
        data: {
            data: updatedDoc
        }
    })
})

exports.deleteRegisteredSubject = catchAsync( async (req, res, next) => {
    const deletedDoc = await RegisterSubject.findByIdAndDelete(req.params.id)

    res.status(204).json({
        status: 'success',
        data: {
            data: deletedDoc
        }
    })
})