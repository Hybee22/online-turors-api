const mongoose = require('mongoose')

const categorySchema = mongoose.Schema(
    {
        name: {
            type: String,
            unique: true,
            lowercase: true
        }
    }, 
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
)

categorySchema.virtual('subjects', {
    ref: 'Subject',
    foreignField: 'category',
    localField: '_id'
  })

const Category = mongoose.model('Category', categorySchema)

module.exports = Category