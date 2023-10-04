const mongoose = require('mongoose');

const safetySchema = mongoose.Schema(
    {
          user:{
            type: mongoose.Schema.Types.ObjectId, 
            required: true,
            ref: 'User'
        },
		workSuspended: {
			type: String,
			required: [ true, 'please add  work suspended' ]
		},
		equipmentWithDrawn: {
			type: String,
			required: [ true, 'please add a  equipment with drawn' ]
		},
		usersAwareness: {
			type: Boolean,
			required: [ true, 'please add aware Supervision' ]
		},
	
		stepToEliHazard:{
			type: String,
			required: [ true, 'please add step to eliminate hazard' ]
        },
        safetyMeasure: {
           type: String,
			required: [ true, 'please add  safety measure' ] 
        },
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
