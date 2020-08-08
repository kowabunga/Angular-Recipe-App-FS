const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const auth = require('../../middleware/auth');
const {
  getUserInfo,
  createUser,
  updateUser,
  getUserRecipes,
} = require('../controllers/users');

// @route   Get api/user
// @desc    Get user's info
// @access  private
router.get('/', auth, getUserInfo);

// @route   POST api/users
// @desc    Create user
// @access  public
router.post(
  '/',
  [
    check('name', 'Name is required').notEmpty(),
    check('email', 'Email is required').isEmail(),
    check(
      'password',
      'Please enter a password with more than six characters'
    ).isLength({ min: 6 }),
  ],
  createUser
);

// @route   PUT /api/users/:id
// @desc    Update user information by id
// @access  Private
router.put('/', auth, updateUser);

// @route   GET api/users/recipes
// @desc    Get recipes for by userId
// @access  private
router.get('/recipes', auth, getUserRecipes);

module.exports = router;
