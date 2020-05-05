const mongoose = require('mongoose')

const bookingSchema = mongoose.Schema(
    {
        student: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
            required: [true, 'Booking requires a user ID']
        },
        subject: {
            type: mongoose.Schema.ObjectId,
            ref: 'Subject',
            required: [ true, 'You must add a subject before booking' ]
        },
        reserved:             {
            from: {
                type: Date,
                required: true
            },
            to: {
                type: Date,
                required: true
            }
        },
        fulfilled: {
            type: Boolean,
            default: false
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
        path: 'user',
        select: 'username email'
    })

    this.select('-createdAt -__v -fulfilled -reserved')

    next()
})

const Booking = mongoose.model('Booking', bookingSchema)

module.exports = Booking