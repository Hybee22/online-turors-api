const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');
const subjectController = require('../controllers/subjectController');
// Routes merged to registerSubject
const registerSubjectRoutes = require('../routes/registerSubjectRoutes')

// SUBJECT ROUTES

router
    .route('/')
    .get(
        authController.protect, 
        subjectController.getAllSubjects
    )

router
    .route('/:id')
    .get(
        authController.protect, 
        authController.restrictTo('admin'), 
        subjectController.getSubject
)

router
    .route('/:categoryId/all')
    .get(
        authController.protect, 
        subjectController.getSubject
    )
    
router
    .route('/:subjectId/tutors')
    .get(
        authController.protect,
        authController.restrictTo('student'), 
        subjectController.getTutors
    )

router
    .route('/')
    .post(
        authController.protect, 
        authController.restrictTo('admin'), 
        subjectController.createSubject
    )

router
    .route('/:id')
    .patch(
        authController.protect, 
        authController.restrictTo('admin'), 
        subjectController.updateSubject
    )
    .delete(
        authController.protect, 
        authController.restrictTo('admin'), 
        subjectController.deleteSubject
    )
    

router.use('/', registerSubjectRoutes)


module.exports = router;