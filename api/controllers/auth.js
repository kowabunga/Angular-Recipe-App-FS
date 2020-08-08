const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/user');
const { validationResult } = require('express-validator');

exports.login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email: email });

    if (!user) {
      return res
        .status(401)
        .json({ success: false, error: 'Invalid Credentials' });
    }

    //   Compare passwords ot check if the are the same
    const passMatch = await bcrypt.compare(password, user.password);

    if (!passMatch) {
      return res
        .status(401)
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
};
