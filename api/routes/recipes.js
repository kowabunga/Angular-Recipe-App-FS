const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const Recipe = require('../../models/recipe');
const User = require('../../models/user');
const auth = require('../../middleware/auth');

// @route   GET api/recipes/
// @desc    Get all recipes
// @access  public
router.get('/', async (req, res) => {
  try {
    const recipes = await Recipe.find();
    if (!recipes) {
      return res.status(404).json({ msg: 'No recipe found for this id' });
    }

    res.status(200).json(recipes);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// @TODO Move to users routes?
// @route   GET api/recipes/user
// @desc    Get recipes for by userId
// @access  private
router.get('/user', auth, async (req, res) => {
  console.log(req.user.id);
  try {
    const recipes = await Recipe.find({ user: req.user.id });

    if (!recipes) {
      return res
        .status(400)
        .json({ success: false, error: 'User has no recipes' });
    }

    res.status(200).json({ success: true, recipes: recipes });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/recipes/:id
// @desc    Get recipe by id
// @access  public
router.get('/:id', async (req, res) => {
  try {
    const recipe = await Recipe.findOne({ id: req.params.id });
    if (!recipe) {
      return res.status(404).json({ msg: 'No recipe found for this id' });
    }

    res.status(200).json(recipe);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

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
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // get the logged in user - need to add user id to recipe.
      // .select(-password) removes password from result
      const user = await User.findById({ _id: req.user.id });

      console.log(user);

      if (!user) {
        return res
          .status(400)
          .json({ success: false, error: 'User does not exist' });
      }

      const {
        recipeTitle,
        recipeDescription,
        recipeImage,
        ingredients,
        recipeSteps,
      } = req.body;

      const recipe = new Recipe({
        user: user._id,
        recipeTitle,
        recipeDescription,
        recipeImage,
        ingredients,
        recipeSteps,
      });

      await recipe.save();

      res.status(201).send({ success: true, msg: 'Recipe Created' });
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   DELETE api/recipes/:id
// @desc    Delete recipe by id
// @access  public
router.delete('/:id', async (req, res) => {
  try {
    await Recipe.findOneAndDelete({ id: req.params.id });

    res.status(200).json({ success: true, msg: 'Recipe deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
