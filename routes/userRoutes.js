const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

// AUTH ROUTES
router.post('/signup', authController.signup);
router.post('/signup/tutor', authController.signupTutor);
router.post('/login', authController.login);

// Protect Routes
router.use(authController.protect);

// USER ROUTES
router.route('/tutors').get(userController.searchTutors);

router
  .route('/tutors/:id/deactivate')
  .patch(authController.restrictTo('admin'), userController.deactivate);

router
  .route('/tutors/:id/make-admin')
  .patch(authController.restrictTo('admin'), userController.makeAdmin);

// Restrict to Admins
router.use(authController.restrictTo('admin', 'tutor', 'student'));

router.route('/').get(userController.getAllUsers);

router.route('/:id').get(userController.getUser);

router.route('/tutors/all').get(userController.getTutors);

module.exports = router;
