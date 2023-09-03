const mongoose = require('mongoose');

const safetySchema = mongoose.Schema(
    {
          user:{
            type: mongoose.Schema.Types.ObjectId, 
            required: true,
            ref: 'User'
        },
		workToSuspended: {
			type: String,
			required: [ true, 'please add  work suspended' ]
		},
		equipWithDrawn: {
			type: String,
			required: [ true, 'please add a  equipment with drawn' ]
		},
		AwareSupervision: {
			type: Boolean,
			required: [ true, 'please add aware Supervision' ]
		},
		postedWarning: {
			type: Boolean,
			required: [ true, 'please add waring post' ],
			unique: true
		},
		controlHazards:{
			type: String,
			required: [ true, 'please add start date' ]
        },
        safetyMeasures: {
           type: String,
			required: [ true, 'please add  start time' ] 
        },
		signatureId: {
			type: String,
		}
	},
	{
		timestamps: true
	}
);
module.exports = mongoose.model('Safety', safetySchema);
