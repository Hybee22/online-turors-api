const mongoose = require('mongoose')

const bookingSchema = mongoose.Schema(
    {
        subject: {
            type: mongoose.Schema.ObjectId,
            ref: 'Subject',
            required: [ true, 'You must add a subject before booking' ]
        },
        student: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
            required: [true, 'Booking requires a user ID']
        },
        tutor: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
            required: [true, 'Booking requires a user ID']
        },
        startDate: {
            type: Date,
            default: Date.now 
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        fulfilled: {
            type: Boolean,
            default: false
        }
    }, 
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }

)

bookingSchema.pre(/^find/, function(next) {
    this.populate({
        path: 'subject',
        select: 'name'
    }).populate({
        path: 'student',
        select: 'username email'
    }).populate({
        path: 'tutor',
        select: 'username email'
    })

    next()
})

const Booking = mongoose.model('Booking', bookingSchema)

module.exports = Booking