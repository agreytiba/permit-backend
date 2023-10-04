const mongoose = require('mongoose');

const workSchema = mongoose.Schema(
    {
        user:{
            type: mongoose.Schema.Types.ObjectId, 
            required: true,
            ref: 'User'
        },
		location: {
			type: String,
			required: [ true, 'please add  a location' ]
		},
		contactName: {
			type: String,
			required: [ true, 'please add a contact name' ]
		},
		contactPhone: {
			type: String,
			required: [ true, 'please add a phone number' ]
		},
		desc: {
			type: String,
			required: [ true, 'please add an desc' ],
			unique: true
		},
		startDate: {
			type: String,
			required: [ true, 'please add start date' ]
        },
        startTime: {
           type: String,
			required: [ true, 'please add  starting time' ] 
		},
	
		endDate: {
			type: String,
			required: [ true, 'please add  ending date' ]
		},
		endTime: {
			type: String,
			required: [ true, 'please add  ending time' ]
		},
		
	},
	{
		timestamps: true
	}
);
module.exports = mongoose.model('Work', workSchema);
