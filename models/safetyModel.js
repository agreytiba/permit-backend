const mongoose = require('mongoose');

const safetySchema = mongoose.Schema(
    {
          user:{
            type: mongoose.Schema.Types.ObjectId, 
            required: true,
            ref: 'User'
        },
		workSuspended:[],
		equipmentWithDrawn:[],
		usersAwareness: {
			type: Boolean,
			required: [ true, 'please add aware Supervision' ]
		},
	
		stepToEliHazard:[],
        safetyMeasure: [],
		signature: {
			type: mongoose.Schema.Types.ObjectId, 
            required: true,
            ref: 'Signature'
		}
	},
	{
		timestamps: true
	}
);
module.exports = mongoose.model('Safety', safetySchema);
