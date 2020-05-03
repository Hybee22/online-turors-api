const mongoose = require('mongoose')

const subjectSchema = mongoose.Schema(
    {
        name: String,
        category: {
            type: mongoose.Schema.ObjectId,
            ref: 'Category'
        },
        tutors: [
            {
                type: mongoose.Schema.ObjectId,
                ref: 'User'
            }
        ]
    }, 
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
)

subjectSchema.virtual('booking', {
    ref: 'User',
    foreignField: 'subject',
    localField: 'booking'
  })

//   subjectSchema.pre(/^find/, function(next) {
//     this.populate({
//         path: 'tutors',
//         select: 'username email'
//     })
//     next()
// })

subjectSchema.index({ category: 1 })
subjectSchema.index({ name: "text" })

const Subject = mongoose.model('Subject', subjectSchema)

module.exports = Subject















// this.populate({ //Populates just the user document
//     path: 'user',
//     select: 'name photo'
// })