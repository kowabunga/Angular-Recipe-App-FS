const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/user');
const { check, validationResult } = require('express-validator');

//@route    post api/auth
//@desc     log in user
//@access   public
router.post(
  '/',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { email, password } = req.body;
      let user = await User.findOne({ email: email });

      if (!user) {
        return res
          .status(400)
          .json({ success: false, error: 'Invalid Credentials' });
      }

      //   Compare passwords ot check if the are the same
      const passMatch = await bcrypt.compare(password, user.password);

      if (!passMatch) {
        return res
          .status(400)
          .json({ success: false, error: 'Invalid Credentials' });
      }

      //   Create/sign/return json webtoken
      const payload = {
        user: {
          id: user.id,
        },
      };

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
