const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RecipeSchema = new Schema({
  id: {
    type: String,
    required: true,
  },
  recipeTitle: {
    type: String,
    required: true,
  },
  recipeDescription: {
    type: String,
    required: true,
  },
  recipeImage: {
    type: String,
    required: true,
  },
  ingredients: {
    type: String,
  },
  recipeSteps: [
    {
      title: {
        type: String,
        required: true,
      },
      directions: {
        type: String,
        required: true,
      },
      media: {
        type: String,
      },
      mediaType: {
        type: String,
      },
      timer: {
        type: String,
      },
      optional: {
        type: String,
      },
    },
  ],
});

module.exports = Recipe = mongoose.model('recipe', RecipeSchema);
