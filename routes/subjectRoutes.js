const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');
const subjectController = require('../controllers/subjectController');

// CATEGORY ROUTES

// Protect Routes
router.use(authController.protect)

router
    .route('/')
    .get(subjectController.getAllSubjects)

router
    .route('/:id')
    .get(subjectController.getSubject)

router
    .route('/:categoryId/all')
    .get(subjectController.getSubject)
    
router
    .route('/:subjectId/tutors')
    .get(authController.restrictTo('student'), subjectController.getTutors )

// Restrict to Admins
router.use(authController.restrictTo('admin'))

router
    .route('/')
    .post(subjectController.createSubject)

router
    .route('/:id')
    .patch(subjectController.updateSubject)
    .delete(subjectController.deleteSubject)
    
    
// router
//     .route('/:userId/registered')
//     .get( authController.protect, authController.restrictTo('tutor'), subjectController.getRegisteredSubjects )
    

module.exports = router;