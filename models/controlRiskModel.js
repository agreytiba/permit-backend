const mongoose = require('mongoose');

const controlRiskSchema = mongoose.Schema(
    {
          user:{
            type: mongoose.Schema.Types.ObjectId, 
            required: true,
            ref: 'User'
        },
		isoServices:[],
		safetyImplication: {
			type: Boolean,
			required: [ true, 'please add a  safety implication' ]
		},
		lockOff: {
			type: Boolean,
			required: [ true, 'please add lock off' ]
		},
		signsPosted: {
			type: Boolean,
			required: [ true, 'please add waring post' ],
			unique: true
		},
		airMonitoring:{
			type: Boolean,
			required: [ true, 'please add  air monitoring' ]
        },
        hazardsAssociated: {
           type: String,
			required: [ true, 'please add  hazard associated ' ] 
        },
		signatureId: {
			type: String,
		}
	},
	{
		timestamps: true
	}
);
module.exports = mongoose.model('Risk', controlRiskSchema);
