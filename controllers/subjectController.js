const Subject = require('../models/subjectModel')
const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/appError')
const APIFeatures = require('../utils/apiFeatures')

exports.getAllSubjects = catchAsync( async (req, res, next) => {

    let filter = {}

    // 1. SEARCHING
    if (req.query.search) {
        const searchString = req.query.search.split(',').join(' ')
        filter = ({ $text: { $search: searchString }})

    }

    const features = new APIFeatures(Subject.find(filter), req.query)
        .sort()

    const subjects = await features.query

    res.status(200).json({
        status: 'success',
        results: subjects.length,
        data: {
          data: subjects
        }
      });
})

exports.getSubject = catchAsync( async (req, res, next) =>  {

    let filter = {}

    if (req.params.categoryId) filter = { category: req.params.categoryId }
    else filter = { _id: req.params.id }

    const features = new APIFeatures(Subject.find(filter)
       .populate({
                path: 'tutors',
                select: 'username email'
            })
      .select('-__v'), req.query)
      .sort()

    const subject = await features.query
  
    if (!subject) {
      return next(new AppError('No document with that ID not found', 404))
    }
  
    res.status(200).json({
      status: 'success',
      data: {
        data: subject
      }
    });
})

exports.createSubject = catchAsync( async (req, res, next) => {
    const subject = await Subject.create(req.body)

    res.status(201).json({
        status: 'success',
        data: {
          data: subject
        }
      });
})

exports.updateSubject = catchAsync( async (req, res, next) => {
    const subject = await Subject.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
      });
  
      if (!subject) {
        return next(new AppError('No document with that ID not found', 404))
      }
  
      res.status(200).json({
        status: 'success',
        data: {
          data: subject
        }
      });
})

exports.deleteSubject = catchAsync( async (req, res, next) => {
    const subject = await Subject.findByIdAndDelete(req.params.id);
  
      if (!subject) {
        return next(new AppError('No document with that ID not found', 404))
      }
  
      res.status(204).json({
        status: 'success',
        data: {
          data: subject
        }
      });
})

exports.getTutors = catchAsync( async (req, res, next) => {
    const subject = await Subject.findById(req.params.subjectId)

    if (!subject) {
        return next(
            new AppError('No document with this ID found', 404)
        )
    }

    const tutors = subject.tutors

    res.status(200).json({
        status: 'success',
        data: {
            data: tutors
        }
    })

})

// exports.getRegisteredSubjects = catchAsync( async (req, res, next) => {
//     let id;
//     if (req.user.id === req.params.userId) {
//         id = req.user.id; 
//     }
//     else {
//         return next(new AppError('Invalid User ID', 400))
//     }
    
//     const subjects = await Subject.find()

//     const registered = subjects.forEach((sub, index) => {
//         if (sub.tutors[index].id === id) {
//             if (sub.tutors.filter(tutor => {
//                 tutor.id === id !== null
//                 return console.log({
//                     _id: sub._id,
//                     name: sub.name,
//                     category: sub.category
//                 }) 
//             })) ;
//         }
//     })  

//     res.status(200).json({
//         status: 'success',
//         data: {
//             data: registered
//         }
//     })
// })