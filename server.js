const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDb = require('./config/db');

dotenv.config({ path: './config/config.env' });

connectDb();

// Body parser
const app = express();

app.use(express.json({ extended: false }));

const PORT = process.env.PORT || 8080;

// API Routes - Recipes
const recipes = require('./api/routes/recipes');
const users = require('./api/routes/users');
const auth = require('./api/routes/auth');

app.use('/api/recipes', recipes);
app.use('/api/users', users);
app.use('/api/auth',auth)

// CORS
app.use(cors());

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
