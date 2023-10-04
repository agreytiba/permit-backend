const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

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
	const { firstName,lastName,projectId, email, password, phoneNumber,userType} = req.body;
	if (!firstName || !lastName|| !projectId || !email || !phoneNumber || !password) {
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

	//  create user
	const user = await User.create({
		firstName,
		lastName,
		projectId,
		email,
		phoneNumber,
		userType,
		
		password: hashedPassword
	});
	if (user) {
		res.status(201).json("successfull registered");
	} else {
		res.status(400);
		throw new Error('invalid user data');
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
		res.json({
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
	const user = await User.findById(req.params.id);
	if (user) {
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
        throw new Error(' mtumiaji hayupo kwenye mfumo')
    }

    await User.findOneAndDelete(req.params.id)
    res.status(200).json("successfully deleted")
})
//   add logout from the system
// Generate JWT
const generateToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: '30d'
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
