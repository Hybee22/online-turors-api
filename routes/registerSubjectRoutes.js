const express = require('express');
const router = express.Router({ mergeParams: true });

const authController = require('../controllers/authController');
const registerSubjectController = require('../controllers/registerSubjectController');

// Protect Routes
router.use(authController.protect)
router.use(authController.restrictTo('tutor'))

router
    .route('/tutor/register')
    .post(registerSubjectController.registerSubject )

router  
    .route('/registered')
    .get(registerSubjectController.getAllRegisteredSubject)

router  
    .route('/registered/:id')
    .patch(registerSubjectController.updateRegisteredSubject)
    .delete(registerSubjectController.deleteRegisteredSubject)

module.exports = router