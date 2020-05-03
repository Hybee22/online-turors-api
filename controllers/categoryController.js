const Category = require('../models/categoryModel')
const catchAsync = require('../utils/catchAsync')


exports.getAllCategories = catchAsync( async (req, res, next) => {

    const categories = await Category.find().select('-__v')

    res.status(200).json({
        status: 'success',
        results: categories.length,
        data: {
          data: categories
        }
      });
})

exports.getCategory = catchAsync( async (req, res, next) =>  {

    const category = await Category.findById(req.params.id).select('-__v')
  
    if (!category) {
      return next(new AppError('No document with that ID not found', 404))
    }
  
    res.status(200).json({
      status: 'success',
      data: {
        data: category
      }
    });
})

exports.createCategory = catchAsync( async (req, res, next) => {
    const category = await Category.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        data: category
      }
    });

})

exports.updateCategory = catchAsync( async (req, res, next) => {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
      });
  
      if (!category) {
        return next(new AppError('No document with that ID not found', 404))
      }
  
      res.status(200).json({
        status: 'success',
        data: {
          data: category
        }
      });
})

exports.deleteCategory = catchAsync( async (req, res, next) => {
    const category = await Category.findByIdAndDelete(req.params.id);
  
      if (!category) {
        return next(new AppError('No document with that ID not found', 404))
      }
  
      res.status(204).json({
        status: 'success',
        data: {
          data: category
        }
      });
})
