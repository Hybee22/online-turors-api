const mongoose = require('mongoose')

const registerSubjectSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    category: {
        type: mongoose.Schema.ObjectId,
        ref: 'Category'
    },
    subject: 
        {
            type: mongoose.Schema.ObjectId,
            ref: 'Subject'
        }
    ,
    registered: {
        type: Boolean,
        default: true
    }
}, 
{
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
})

// QUERY MIDDLEWARE
registerSubjectSchema.pre(/^find/, function(next) {
    this.populate({
        path: 'subject',
        select: 'name'
    })
    next()
})

const RegisterSubject = mongoose.model('RegisterSubject', registerSubjectSchema)

module.exports = RegisterSubject