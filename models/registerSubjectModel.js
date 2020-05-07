const mongoose = require('mongoose');

const registerSubjectSchema = new mongoose.Schema(
  {
    tutor: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
    category: {
      type: mongoose.Schema.ObjectId,
      ref: 'Category',
    },
    subject: {
      type: mongoose.Schema.ObjectId,
      ref: 'Subject',
    },
    registered: {
      type: Boolean,
      default: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// QUERY MIDDLEWARE
registerSubjectSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'subject',
    select: 'name',
  })
    .populate({
      path: 'category',
      select: 'name',
    })
    .populate({
      path: 'tutor',
      select: 'username email',
    });
  next();
});

const RegisterSubject = mongoose.model(
  'RegisterSubject',
  registerSubjectSchema
);

module.exports = RegisterSubject;
