const mongoose = require('mongoose')

const subjectSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'A subject must have a name'],
            lowercase: true
        },
        category: {
            type: mongoose.Schema.ObjectId,
            required: [true, 'A subject must belong to a category'],
            ref: 'Category'
        },
    }, 
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
)

subjectSchema.index({ category: 1 })
subjectSchema.index({ name: "text" })

subjectSchema.virtual('tutors', {
    ref: 'RegisterSubject',
    foreignField: 'subject',
    localField: '_id'
  })

subjectSchema.virtual('lessons', {
    ref: 'Booking',
    foreignField: 'subject',
    localField: '_id'
  })

const Subject = mongoose.model('Subject', subjectSchema)

module.exports = Subject















// this.populate({ //Populates just the user document
//     path: 'user',
//     select: 'name photo'
// })