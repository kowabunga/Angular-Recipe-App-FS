const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const auth = require('../../middleware/auth');
const {
  getRecipes,
  getRecipeById,
  createRecipe,
  updateRecipe,
  deleteRecipeById,
} = require('../controllers/recipes');

// @route   GET api/recipes/
// @desc    Get all recipes
// @access  public
router.get('/', getRecipes);

// @route   GET api/recipes/:id
// @desc    Get recipe by id
// @access  public
router.get('/:id', getRecipeById);

// @route   POST api/recipes
// @desc    Create a recipe
// @access  private - temp public
router.post(
  '/',
  [
    auth,
    check('recipeTitle', 'Recipe title is required').notEmpty(),
    check('recipeDescription', 'Recipe description is required').notEmpty(),
    check('recipeImage', 'Recipe image is required').notEmpty(),
    check('ingredients', 'Recipe ingredients are required').notEmpty(),
    check('recipeSteps', 'Recipe needs at least one step').isLength({ min: 1 }),
  ],
  createRecipe
);

// @route   PUT api/recipes/:id
// @desc    Update recipe by id
// @access  private
router.put(
  '/:id',
  [
    auth,
    check('recipeTitle', 'Recipe title is required').notEmpty(),
    check('recipeDescription', 'Recipe description is required').notEmpty(),
    check('recipeImage', 'Recipe image is required').notEmpty(),
    check('ingredients', 'Recipe ingredients are required').notEmpty(),
    check('recipeSteps', 'Recipe needs at least one step').isLength({ min: 1 }),
  ],
  updateRecipe
);

// @route   DELETE api/recipes/:id
// @desc    Delete recipe by id
// @access  public
router.delete('/:id', deleteRecipeById);

module.exports = router;
