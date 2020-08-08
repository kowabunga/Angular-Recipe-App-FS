const Recipe = require('../../models/recipe');
const User = require('../../models/user');
const { validationResult } = require('express-validator');

exports.getRecipes = async (req, res) => {
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
};

exports.getRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.findById({ _id: req.params.id });
    if (!recipe) {
      return res.status(404).json({ msg: 'No recipe found for this id' });
    }

    res.status(200).json(recipe);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

exports.createRecipe = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    // get the logged in user - need to add user id to recipe.
    // .select(-password) removes password from result
    const user = await User.findById({ _id: req.user.id });

    //? Does this need to be done? User id is already in header from auth middleware...
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
};

exports.updateRecipe = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const {
      recipeTitle,
      recipeDescription,
      recipeImage,
      ingredients,
      recipeSteps,
    } = req.body;

    //? Does this need to be done? User id is already in header from auth middleware...
    const user = await User.findById({ _id: req.user.id });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, error: 'User does not exist' });
    }

    let recipe = await Recipe.findById({ _id: req.params.id });
    if (!recipe) {
      return res
        .status(400)
        .json({ success: false, error: 'Recipe does not exist' });
    }

    // No need to make "new Recipe({})" since we're updating one that already exists - \gets rid of MongoError: Performing an update on the path '_id' would modify the immutable field '_id'\ error
    let updatedRecipe = {
      user: user._id,
      recipeTitle,
      recipeDescription,
      recipeImage,
      ingredients,
      recipeSteps,
    };

    await Recipe.findByIdAndUpdate({ _id: req.params.id }, updatedRecipe);

    return res.status(200).json({ success: true, recipe: updatedRecipe });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

exports.deleteRecipeById = async (req, res) => {
  try {
    await Recipe.findOneAndDelete({ _id: req.params.id });

    res.status(200).json({ success: true, msg: 'Recipe deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};
