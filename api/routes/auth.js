const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { login, sendResetLink, resetPassword } = require('../controllers/auth');

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

// @route   GET /api/auth/reset
// @desc    Create and send reset password link to email
// @access  Public
router.get('/reset', sendResetLink);

// @route   PATCH /api/auth/reset/:jwt
// @desc    Reset user password
// @access  Public
router.patch('/reset/:jwt', resetPassword);

module.exports = router;
