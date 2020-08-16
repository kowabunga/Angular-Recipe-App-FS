const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/user');
const { validationResult } = require('express-validator');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

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

exports.sendResetLink = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email }).select(
      '-password'
    );

    if (!user) {
      return res
        .status(400)
        .json({ success: false, msg: 'No user with that email' });
    }

    // Generate token
    const resetToken = crypto.randomBytes(20).toString('hex');

    // Hash token and save to user
    const hashedToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');

    const resetPasswordExp = Date.now() + 15 * 60 * 1000;

    await user.updateOne(
      {
        passwordResetToken: hashedToken,
        passwordResetTokenExpiry: resetPasswordExp,
      },
      sendEmail(req, user, resetToken)
    );

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const resetToken = req.params.token;
    const hashedToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');

    // Check for user and see if reset token is not expired
    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ success: false, msg: 'Token expired' });
    }

    // Get new password, hash, and store in db. Clear out reset token and expiry
    let password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);

    await user.updateOne({
      password: password,
      passwordResetToken: undefined,
      passwordResetTokenExpiry: undefined,
    });

    // Create and send new token so user will be automatically logged in
    const payload = {
      user: {
        id: user._id,
      },
    };

    jwt.sign(
      payload,
      process.env.SECRET,
      { expiresIn: Date.now() + '7d' },
      (error, token) => {
        if (error) throw error;
        return res
          .status(200)
          .json({ success: true, msg: 'Password Updated', token: token });
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

async function sendEmail(req, user, token) {
  console.log(`email Token: ${token}`);
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      secureConnection: false,
      port: process.env.SMPT_PORT,

      auth: {
        user: process.env.SMPT_USERNAME,
        pass: process.env.SMPT_PASSWORD,
      },
    });

    const url = `http://localhost:4200/passwordreset/${token}`;

    await transporter.sendMail({
      from: `"Delectable Recipes" <${process.env.SMPT_USERNAME}>`, // outlook needs to be same.
      to: `${user.email}`, // list of receivers
      subject: 'Forgot Password - Delectable Recipes', // Subject line
      text: `The reset link will be valid for 15 minutes only. If the below link does not work, copy and paste this link in to your browser. ${url}`, // plain text body
      html: `
              <p>The reset link will be valid for 15 minutes only.</p>
              <p>Reset your password <a href="${url}">here</a></p>
              <p>If the above link does not work, copy and paste this link into your browser. ${url} </p>
            `, // html body
    });
  } catch (error) {
    console.error(error);
    await user.updateOne({
      passwordResetToken: undefined,
      passwordResetTokenExpiry: undefined,
    });
  }
}
