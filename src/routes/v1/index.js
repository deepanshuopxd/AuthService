const express = require('express');

const UserController = require('../../controllers/user-controller');
const {AuthRequestValidators} = require('../../middlewares/index')
const router = express.Router();

router.post(
    '/signup', 
    AuthRequestValidators.validateUserAuth,
    UserController.create
);
router.get('/user/:id',UserController.getById);
router.post('/signin',
    AuthRequestValidators.validateUserAuth,
    UserController.signIn);
module.exports = router;