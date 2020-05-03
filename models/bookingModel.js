const mongoose = require('mongoose')

const bookingSchema = mongoose.Schema(
    {
        subject: {
            type: mongoose.Schema.ObjectId,
            ref: 'Subject',
            required: [ true, 'You must add a subject before booking' ]
        },
        user: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
            required: [true, 'Booking requires a user ID']
        },
        createdAt: {
            type: Date,
            default: Date.now
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
        path: 'user',
        select: 'username email'
    })

    next()
})

const Booking = mongoose.model('Booking', bookingSchema)

module.exports = Booking