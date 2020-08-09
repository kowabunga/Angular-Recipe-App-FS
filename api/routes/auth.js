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

// @route   POST /api/auth/reset
// @desc    Create reset token and send reset email
// @access  Public
router.post('/reset', sendResetLink);

// @route   PATCH /api/auth/reset/:token
// @desc    Reset user password
// @access  Public
router.patch('/reset/:token', resetPassword);

module.exports = router;
