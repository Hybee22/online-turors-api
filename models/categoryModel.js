const mongoose = require('mongoose');
const Subject = require('./subjectModel');

const categorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      lowercase: true,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

categorySchema.virtual('subjects', {
  ref: 'Subject',
  foreignField: 'category',
  localField: '_id',
});

// categorySchema.pre(/^delete/, async function (next) {
//   console.log(this._id);
//   await Subject.deleteMany({ category: this._id });

//   next();
// });

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
