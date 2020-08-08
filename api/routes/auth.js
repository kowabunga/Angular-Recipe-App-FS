const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { login } = require('../controllers/auth');

//@route    post api/auth
//@desc     log in user
//@access   public
router.post(
  '/',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  login
);

module.exports = router;
