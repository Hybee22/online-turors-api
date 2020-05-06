const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

// AUTH ROUTES
router.post('/signup', authController.signup)
router.post('/login', authController.login)

// Protect Routes
router.use(authController.protect)

// USER ROUTES
router
    .route('/tutors')
    .get(userController.searchTutors)

// Restrict to Admins
router.use(authController.restrictTo('admin'))

router
    .route('/')
    .get(userController.getAllUsers)

router
    .route('/:id')
    .get(userController.getUser)

router
    .route('/tutors/all')
    .get(userController.getTutors)

router
    .route('/tutors/:id/deactivate')
    .patch(userController.deactivate)

module.exports = router;