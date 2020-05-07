const express = require('express');
const router = express.Router({ mergeParams: true });

const authController = require('../controllers/authController');
const registerSubjectController = require('../controllers/registerSubjectController');

router  
    .route('/registered/all')
    .get(authController.protect, authController.restrictTo('tutor'), registerSubjectController.getAllRegisteredSubject)

router
    .route('/tutor/register')
    .post(authController.protect, authController.restrictTo('tutor'), registerSubjectController.registerSubject)


router  
    .route('/registered/:id')
    .get(authController.protect, authController.restrictTo('tutor'), registerSubjectController.getRegisteredSubject)
    .patch(authController.protect, authController.restrictTo('tutor'), registerSubjectController.updateRegisteredSubject)
    .delete(authController.protect, authController.restrictTo('tutor'), registerSubjectController.deleteRegisteredSubject)

module.exports = router