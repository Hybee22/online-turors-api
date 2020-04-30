const mongoose = require('mongoose')

const subjectSchema = mongoose.Schema(
    {
        name: String,
        category: {
            type: mongoose.Schema.ObjectId,
            ref: 'Category'
        }
    }, 
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
)

subjectSchema.index({ category: 1 })

// QUERY MIDDLEWARE

subjectSchema.pre(/^find/, function(next) {
    //Populates just the category document
    this.populate({ 
        path: 'category',
        select: 'name'
    })
    next()
})

const Subject = mongoose.model('Subject', subjectSchema)

module.exports = Subject















// this.populate({ //Populates just the user document
//     path: 'user',
//     select: 'name photo'
// })