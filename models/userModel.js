const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
	{
		firstName: {
			type: String,
			required: [ true, 'please add  a first name' ]
		},
		lastName: {
			type: String,
			required: [ true, 'please add a last name' ]
		},
		projectId: {
			type: String,
			required: [ true, 'please add a last name' ]
		},
		email: {
			type: String,
			required: [ true, 'please add an email' ],
			unique: true
		},
		phoneNumber: {
			type: Number,
			required: [ true, 'please add phone number' ]
		},
		userType: {
			type: String,
			default:"user",
		},
	  profilePic: {
      type: String,
      default: "",
    },

		password: {
			type: String,
			required: [ true, 'please add a password' ]
		},
		
	},
	{
		timestamps: true
	}
);
module.exports = mongoose.model('User', userSchema);
