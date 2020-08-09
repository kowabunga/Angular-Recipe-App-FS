const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/user');
const { validationResult } = require('express-validator');
const nodemailer = require('nodemailer');

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
    const email = req.body.email;
    const user = await User.findOne({ email: email }).select('-password');

    if (!user) {
      return res
        .status(400)
        .json({ success: false, msg: 'No user with that email' });
    }
    const payload = {
      email: user.email,
    };

    await jwt.sign(
      payload,
      process.env.SECRET,
      {
        expiresIn: Date.now() + '15m',
      },
      async (error, token) => {
        if (error) throw error;
        try {
          const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            secureConnection: false,
            port: process.env.SMPT_PORT,
            tls: {
              ciphers: 'SSLv3',
            },
            auth: {
              user: process.env.SMPT_USERNAME,
              pass: 'zajta2-pafjiG-muhmyt',
            },
          });

          let info = await transporter.sendMail({
            from: `"Delectable Recipes" <${process.env.SMPT_USERNAME}>`, // outlook needs to be same.
            to: 'anthony.siletti@gmail.com', // list of receivers
            subject: 'Forgot Password - Delectable Recipes', // Subject line
            text: `The reset link will be valid for 15 minutes only. If the below link does not work, copy and paste this link in to your browser. http://localhost:4200/passwordreset/${token}`, // plain text body
            html: `
              <p>The reset link will be valid for 15 minutes only.</p>
              <p>Reset your password <a href="http://localhost:4200/passwordreset/${token}">here</a></p>
            `, // html body
          });

          console.log('Message sent: %s', info.messageId);
          console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        } catch (error) {
          console.error(error);
        }
      }
    );

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const jwt = req.params.jwt;

    // Verify and extract info from jwt
    const isVerified = await jwt.verify(jwt, process.env.SECRET);

    if (isVerified) {
      const user = await User.findOne({ email: isVerified.email });

      let password = req.body.newPassword;

      const salt = bcrypt.genSalt(10);
      password = await bcrypt.hash(password, salt);

      await User.findOneAndUpdate(
        { email: user.email },
        { $set: { password: password } }
      );

      return res.status(200).json({ success: true, msg: 'Password Updated' });
    } else {
      res.status(400).json({ success: false, error: 'Invalid token' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};
