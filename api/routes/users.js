const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const User = require('../../models/user');

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
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { name, email, password } = req.body;
      let user = await User.findOne({ email: email });

      //   Check if user exists. Return error if so
      if (user) {
        return res
          .status(400)
          .json({ success: false, error: 'User already exists' });
      }

      //   Create new user
      user = new User({
        name,
        email,
        password,
      });

      //   need to hash password before storing
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      //   add to db
      await user.save();

      console.log(user);

      //   create and return jwt
      const payload = {
        user: {
          id: user.id,
        },
      };

      //   token expires in one week
      jwt.sign(
        payload,
        process.env.SECRET,
        {
          expiresIn: Date.now() + '7d',
        },
        (error, token) => {
          if (error) throw error;
          res.status(200).json({ token: token });
        }
      );
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
