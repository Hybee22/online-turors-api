const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const APIFeatures = require('../utils/apiFeatures');

exports.getAllUsers = catchAsync(async (req, res, next) => {
  let filter = {};

  const features = new APIFeatures(User.find(filter), req.query).sort();

  // EXECUTE QUERY
  const users = await features.query;

  // SEND RESPONSE
  res.status(200).json({
    status: 'success',
    results: users.length,
    data: {
      data: users,
    },
  });
});

exports.getUser = catchAsync(async (req, res, next) => {
  let user;
  console.log(req.user);
  if (req.user.role === 'student') {
    user = new APIFeatures(
      User.findById(req.params.id)
        .populate({
          path: 'lessons',
        })
        .select('username firstName lastName email'),
      req.query
    ).sort();
  } else if (req.user.role === 'tutor') {
    user = new APIFeatures(
      User.findById(req.params.id)
        .populate({
          path: 'subjects',
          select: '-createdAt -registered',
        })
        .select('username firstName lastName email'),
      req.query
    ).sort();
  } else {
    user = new APIFeatures(
      User.findById(req.params.id)
        .populate({
          path: 'subjects',
          select: '-createdAt -registered -__v',
        })
        .populate({
          path: 'lessons',
        })
        .select('username firstName lastName email'),
      req.query
    ).sort();
  }

  // EXECUTE QUERY
  let userData = await user.query;

  // SEND RESPONSE
  res.status(200).json({
    status: 'success',
    data: {
      data: userData,
    },
  });
});

exports.searchTutors = catchAsync(async (req, res, next) => {
  let filter = {};
  // 1. SEARCHING
  if (req.query.search) {
    const searchString = req.query.search.split(',').join(' ');
    filter = { role: 'tutor', $text: { $search: searchString } };
  } else {
    return next(
      new AppError('This route can only take search parameters', 400)
    );
  }

  const tutors = await User.find(filter).select(
    '_id username firstName lastName email'
  );

  // SEND RESPONSE
  res.status(200).json({
    status: 'success',
    results: tutors.length,
    data: {
      data: tutors,
    },
  });
});

exports.getTutors = catchAsync(async (req, res, next) => {
  const tutors = await User.find({ role: 'tutor' }).select(
    '_id username firstName lastName email'
  );

  // SEND RESPONSE
  res.status(200).json({
    status: 'success',
    results: tutors.length,
    data: {
      data: tutors,
    },
  });
});

// Deactivate tutor
exports.deactivate = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new AppError('No document with that ID found', 404));
  }

  if (user.role === 'tutor') {
    user.active = false;
    user.save({ validateBeforeSave: false });
  }
  // SEND RESPONSE
  res.status(204).json({
    status: 'success',
    data: {
      data: user,
    },
  });
});
