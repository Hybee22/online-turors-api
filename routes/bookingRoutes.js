const express = require('express');
const router = express.Router();

const bookingController = require('../controllers/bookingController');
const authController = require('../controllers/authController');

// Protect All Routes To Logged in users

router.use(authController.protect)

// Booking Routes

router
    .route('/')
    .post(authController.restrictTo('admin', 'student'), bookingController.createBooking)

// Admin privilege only
router.use(authController.restrictTo('admin')) 

router
    .route('/')
    .get(bookingController.getAllBookings)

router
    .route('/:id')
    .get(bookingController.getBooking )
    .patch(bookingController.updateBooking)
    .delete(bookingController.deleteBooking)

module.exports = router