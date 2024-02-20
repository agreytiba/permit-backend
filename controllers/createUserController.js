const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const nodemailer = require('nodemailer');


// @desc  create  new user from admin page
// @route POST /api/users
// @access private

const createUser = asyncHandler(async (req, res) => {
	const { firstName,lastName,projectId, email, password, phoneNumber,userType} = req.body;
	if (!firstName || !lastName || !email || !phoneNumber || !password) {
		res.status(400);
		throw new Error('please add all fields');
	}
	//check if user exists
	const userExists = await User.findOne({ email });
	if (userExists) {
		res.status(400);
		throw new Error('email already used please use another email');
	}
	// Hash password
	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(password, salt);

	  // Create a verification token
    const verificationToken = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });
   
	//  create user
	const user = await User.create({
		firstName,
		lastName,
		projectId,
        email,
        userType,
		phoneNumber,
		verificationToken,
		password: hashedPassword
	});
	if (user) {
		 // Send a verification email to the user's email address
    sendVerificationEmail(email,verificationToken);

    res.status(201).json('User registered. Check your email for verification.' );
	} else {
		res.status(400);
		throw new Error('invalid user data');
	}
});

// Function to send a verification email
function sendVerificationEmail(email,verificationToken) {
  const transporter = nodemailer.createTransport({
    // Configure your email service (e.g., SMTP, Gmail)
    service:'Gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: email,
    subject: 'Email Verification',
    text: `Click the following link to verify your email: http://your-backend.com/verify/${verificationToken}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Email sending error:', error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}


const verifyToken = asyncHandler(async (req, res) => {
	const token = req.params.token;
  try {
    // Verify the token and mark the user as verified
    const decoded = jwt.verify(token, 'your-secret-key');
    const email = decoded.email;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    user.isVerified = true;
    await user.save();

    // Redirect the user to a verification success page
    res.redirect('http://your-frontend-app.com/verification-success');
  } catch (error) {
    console.error('Verification error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// delete user
const deleteUser = asyncHandler(async (req, res) => { 
    try {
    const userId = req.params.userId;

    // Find the user by ID and remove it
    const deletedUser = await User.findByIdAndRemove(userId);

    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
})




module.exports = {
  createUser,
  deleteUser
};
