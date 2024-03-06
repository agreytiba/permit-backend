const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const nodemailer = require('nodemailer');

// @desc  get all users
// @route GET /api/users
// @access private
const getUsers = asyncHandler(async (req, res) => {
	// get all uses detail except password
	const allUsers = await User.find({}, { password: 0 });

	if (allUsers) {
		res.status(200).json(allUsers);
	} else {
		res.status(500);
		throw new Error('failed to retrieve users');
	}
});

// @desc  Register new user
// @route POST /api/users
// @access private

const registerUser = asyncHandler(async (req, res) => {
	const { firstName,lastName,projectId, email, password, phoneNumber} = req.body;
	if (!firstName || !lastName || !email || !phoneNumber || !password) {
		res.status(400).json({message:'please add all fields'});
	}
	

	//check if user exists
	const userExists = await User.findOne({ email });
	if (userExists) {
		res.status(400).json({ message: 'email already used please use another email' });
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
		phoneNumber,
		verificationToken,
		password: hashedPassword
	});
	if (user) {
		 // Send a verification email to the user's email address
    sendVerificationEmail(email,verificationToken);

    res.status(200).json('User registered. Check your email for verification.' );
	} else {
		res.status(400).json({ message: 'invalid user data' });
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
	  const response = await user.save();
	  res.status(200).json(response.data)
    // Redirect the user to a verification success page
    res.redirect('http://your-frontend-app.com/verification-success');
  } catch (error) {
    console.error('Verification error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// @desc  authenticate a user
// @route POST /api/users/login
// @access public

const loginUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;

	// check for user by email
	const user = await User.findOne({ email });

	//  compare between added password and password stored in database
	if (user && (await bcrypt.compare(password, user.password))) {
		res.status(200).json({
			_id: user.id,
			firstName: user.firstName,
			lastName: user.lastName,
            projectId:user.projectId,
			email: user.email,
			userType: user.userType,
			profilePic: user.profilePic,
			token: generateToken(user._id)
		});
	} else {
		res.status(400);
		throw new Error('invalid credentials');
	}
});

// @desc  edit  user data
// @route PUT /api/users/:id
// @access private
const updateUser = asyncHandler(async (req, res) => {
	const { id } = req.params;
  // Define an object with allowed fields for update (excluding email and password)
  const allowedFields = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    phoneNumber: req.body.phoneNumber,
    userType: req.body.userType,
  };

  try {
    // Find the user by ID and update only the allowed fields
    const updatedUser = await User.findByIdAndUpdate(id, { $set: allowedFields }, { new: true });
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: 'Unable to update the user.' });
  }
});

// @desc  get user data
// @route GET /api/users/:id
// @access private

const getMe = asyncHandler(async (req, res) => {
	const user = await User.findById(req.params.id);

	res.status(200).json({
		     _id: user.id,
			firstName: user.firstName,
			lastName: user.lastName,
            projectId:user.projectId,
			email: user.email,
			userType: user.userType,
			profilePic: user.profilePic,
	});
});
// @desc  Delete single user
// @route DELETE /api/users/:id
// @access private
const deleteUser = asyncHandler( async(req,res)=>{
    const user = await User.findById(req.params.id)

    // check for the mapDetail
    if(!user){
        res.status(400)
        throw new Error('mtumiaji hayupo kwenye mfumo')
    }

    await User.findOneAndDelete(req.params.id)
    res.status(200).json("successfully deleted")
})
//   add logout from the system
// Generate JWT
const generateToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: '1d'
	});
};

module.exports = {
	registerUser,
	getMe,
	getUsers,
	loginUser,
	deleteUser,
	updateUser
};
