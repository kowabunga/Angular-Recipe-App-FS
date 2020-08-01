const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDb = require('./config/db');

dotenv.config({ path: './config/config.env' });

connectDb();

const app = express();

app.use(express.json({ extended: false }));

const PORT = process.env.PORT || 8080;

// API Routes - Recipes
const recipes = require('./api/routes/recipes');

app.use('/api/recipes', recipes);

// Body parser

// CORS
app.use(cors());

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
