const mongoose = require('mongoose')

const categorySchema = mongoose.Schema(
    {
        name: {
            type: String,
        },
        subjects: [
            {
                type: mongoose.Schema.ObjectId,
                ref: 'Subject'
            }
        ]
    }, 
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
)

const Category = mongoose.model('Category', categorySchema)

module.exports = Category