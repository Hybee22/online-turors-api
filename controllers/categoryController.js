const Category = require('../models/categoryModel');
const catchAsync = require('../utils/catchAsync');
const Subject = require('../models/subjectModel');
const AppError = require('../utils/appError');

exports.getAllCategories = catchAsync(async (req, res, next) => {
  const categories = await Category.find().select('-__v -subjects -slug');

  res.status(200).json({
    status: 'success',
    results: categories.length,
    data: {
      data: categories,
    },
  });
});

exports.getCategory = catchAsync(async (req, res, next) => {
  const category = await Category.findById(req.params.id)
    .select('-__v')
    .populate({
      path: 'subjects',
      select: '-__v -tutors',
    });

  if (!category) {
    return next(new AppError('No document with that ID found', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      data: category,
    },
  });
});

exports.updateSubject = catchAsync(async (req, res, next) => {
  let subId = req.params.subjectId;

  const doc = await Category.find({ name: req.params.name })
    .populate({
      path: 'subjects',
      select: '-__v -tutors',
    })
    .select('-__v -name');

  let subjectArr = doc.map((sub) => sub.subjects);
  let subject = subjectArr[0].filter((sub) => sub.id === subId);
  let subjectId = subject[0].id;

  const updatedSubject = await Subject.findByIdAndUpdate(subjectId, req.body, {
    new: true,
  });

  if (!updatedSubject) {
    return next(new AppError('No document with that ID not found', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      data: updatedSubject,
    },
  });
});

exports.deleteSubject = catchAsync(async (req, res, next) => {
  let subId = req.params.subjectId;

  const doc = await Category.find({ name: req.params.name })
    .populate({
      path: 'subjects',
      select: '-__v -tutors',
    })
    .select('-__v -name');

  let subjectArr = doc.map((sub) => sub.subjects);
  let subject = subjectArr[0].filter((sub) => sub.id === subId);
  let subjectId = subject[0].id;

  const deletedDoc = await Subject.findByIdAndDelete(subjectId);

  if (!deletedDoc) {
    return next(new AppError('No document with that ID not found', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

exports.getSubject = catchAsync(async (req, res, next) => {
  let subId = req.params.subjectId;

  const doc = await Category.find({ name: req.params.name })
    .populate({
      path: 'subjects',
      select: '-__v -tutors',
    })
    .select('-__v -name');

  if (!doc) {
    return next(new AppError('No document with that ID found', 404));
  }

  let subjectArr = doc.map((sub) => sub.subjects);
  let subject = subjectArr[0].filter((sub) => sub.id === subId);

  if ((subject = [])) {
    return next(new AppError('No document with that ID found', 404));
  }

  let subjectId = subject[0].id;
  const subjects = await Subject.findById(subjectId);

  if (!subjects) {
    return next(new AppError('No document with that ID not found', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      data: subjects,
    },
  });
});

exports.getSubjectsByCategory = catchAsync(async (req, res, next) => {
  let filter = {};

  if (req.params.name) filter = { name: req.params.name };

  const subjects = await Category.find(filter)
    .populate({
      path: 'subjects',
      select: '-__v -tutors',
    })
    .select('-__v -name');

  if (!subjects) {
    return next(new AppError('No document with that ID found', 404));
  }

  let subArr = subjects.map((el) => el.subjects);

  res.status(200).json({
    status: 'success',
    data: {
      data: subArr,
    },
  });
});

exports.createCategory = catchAsync(async (req, res, next) => {
  const category = await Category.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      data: category,
    },
  });
});

exports.updateCategory = catchAsync(async (req, res, next) => {
  const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!category) {
    return next(new AppError('No document with that ID not found', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      data: category,
    },
  });
});

exports.deleteCategory = catchAsync(async (req, res, next) => {
  const category = await Category.findByIdAndDelete(req.params.id);

  if (!category) {
    return next(new AppError('No document with that ID not found', 404));
  }

  await Subject.deleteMany({ category: req.params.id });

  res.status(204).json({
    status: 'success',
    data: {
      data: category,
    },
  });
});
