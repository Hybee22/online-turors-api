const Booking = require('../models/bookingModel')
const catchAsync = require('../utils/catchAsync')
const APIFeatures = require('../utils/apiFeatures')

exports.getAllBookings = catchAsync( async (req, res, next) => {

    const features = new APIFeatures(Booking.find()    
      .populate({
        path: 'subject',
        select: 'name'
      }), req.query)
      .sort()

    const bookings = await features.query

    res.status(200).json({
        status: 'success',
        results: bookings.length,
        data: {
          data: bookings
        }
      });
})

exports.createBooking = catchAsync( async (req, res, next) => {
    const booking = await Booking.create(req.body)

    res.status(201).json({
        status: 'success',
        data: {
          data: booking
        }
      });
})

exports.getBooking = catchAsync( async (req, res, next) =>  {

    let filter = {}

    if (req.params.bookingId) filter = { category: req.params.bookingId }


    const features = new APIFeatures(Booking.find(filter)
    .populate({
      path: 'subject',
      select: 'name'
    })
    .select('-__v'), req.query)
    .sort()

    const booking = await features.query
  
    if (!booking) {
      return next(new AppError('No document with that ID not found', 404))
    }
  
    res.status(200).json({
      status: 'success',
      data: {
        data: booking
      }
    });
})

exports.updateBooking = catchAsync( async (req, res, next) => {
    const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
      });
  
      if (!booking) {
        return next(new AppError('No document with that ID not found', 404))
      }
  
      res.status(200).json({
        status: 'success',
        data: {
          data: booking
        }
      });
})

exports.deleteBooking = catchAsync( async (req, res, next) => {
    const booking = await Booking.findByIdAndDelete(req.params.id);
  
      if (!booking) {
        return next(new AppError('No document with that ID not found', 404))
      }
  
      res.status(204).json({
        status: 'success',
        data: {
          data: booking
        }
      });
})