const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/user');
const { validationResult } = require('express-validator');

exports.getUserInfo = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const user = await User.findById({ _id: req.user.id }).select('-password');

    if (!user) {
      return res
        .status(400)
        .json({ success: false, msg: 'User does not exist' });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

exports.createUser = async (req, res) => {
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

    //   create and return jwt adding user id as payload
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
};

exports.updateUser = async (req, res) => {
  try {
    let user = await User.findById(req.user.id);

    if (!user) {
      return status(400).json({ success: false, msg: 'User not found' });
    }

    const { email, name, oldPassword, newPassword } = req.body;

    const updatedUser = {};

    if (name !== user.name) updatedUser.name = name;
    if (email !== user.email) updatedUser.email = email;

    // Compare password in db to old password entered in form. Also compare new password to password in db.
    // If old password equals db password and new password not db password, set password
    if (oldPassword && newPassword) {
      if (
        (await bcrypt.compare(oldPassword, user.password)) &&
        !(await bcrypt.compare(newPassword, user.password))
      ) {
        const salt = await bcrypt.genSalt(10);
        updatedUser.password = await bcrypt.hash(newPassword, salt);
      } else {
        return res
          .status(400)
          .json({ success: false, error: 'Passwords do not match' });
      }
    }

    user = await User.findByIdAndUpdate(user._id, updatedUser, { new: true });

    return res.status(200).json({ success: true, user });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

exports.getUserRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find({ user: req.user.id });

    if (!recipes) {
      return res
        .status(400)
        .json({ success: false, error: 'User has no recipes' });
    }

    res.status(200).json(recipes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};
