const mongoose = require('mongoose')

const categorySchema = mongoose.Schema(
    {
        name: {
            type: String,
            enum: ['Primary','JSS', 'SSS'],
            unique: true
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

categorySchema.pre(/^find/, function(next) {
    this.populate({
        path: 'subjects',
        select: '-__v'
    })
    next()
})

const Category = mongoose.model('Category', categorySchema)

module.exports = Category