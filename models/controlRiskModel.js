const mongoose = require('mongoose');

const controlRiskSchema = mongoose.Schema(
    {
          user:{
            type: mongoose.Schema.Types.ObjectId, 
            required: true,
            ref: 'User'
        },
		isoServices:[],
		safetyResults: {
			type: Boolean,
			required: [ true, 'please add a  safety implication' ]
		},
		lockOff: {
			type: Boolean,
			required: [ true, 'please add lock off' ]
		},
		postedSigns: {
			type: Boolean,
			required: [ true, 'please add waring post' ],
			
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
		},
		name: {
			type:String,
		},
		dept: {
			type:String,
		}
	},
	{
		timestamps: true
	}
);
module.exports = mongoose.model('Risk', controlRiskSchema);
