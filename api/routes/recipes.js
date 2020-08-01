const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const Recipe = require('../../models/recipe');

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
    check('recipeTitle', 'Recipe title is required').isLength({ min: 1 }),
    check('recipeDescription', 'Recipe description is required').isLength({
      min: 1,
    }),
    check('recipeImage', 'Recipe image is required').isLength({ min: 1 }),
    check('ingredients', 'Recipe ingredients are required').isLength({
      min: 1,
    }),
    check('recipeSteps', 'Need at least one recipe step').isLength({ min: 1 }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const {
        id,
        recipeTitle,
        recipeDescription,
        recipeImage,
        ingredients,
        recipeSteps,
      } = req.body;
      let recipe = await Recipe.findOne({ id: id });

      // Check if recipe with unique id already exists (dont' need?)
      if (recipe) {
        return res.status(400).json({
          error: [{ msg: 'Recipe with already exists' }],
        });
      }

      recipe = new Recipe({
        id,
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
