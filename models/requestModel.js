const mongoose = require('mongoose');

const permitSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'user'
    },
    permitStatus:{ type: String,required:true, default:'Received'},
    work: {
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
		works: [],
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
    safety:{
		workSuspended:[],
		equipmentWithDrawn:[],
		usersAwareness: {
			type: Boolean,
			required: [ true, 'please add aware Supervision' ]
		},
	
		stepToEliHazard:[],
        safetyMeasure: [],
	
	},
   
    risk:{
     
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
		name: {
			type:String,
		},
		dept: {
			type:String,
		}
	},
    attachments: [],
    review: [],
		approve: [],
	isApproved: {
		type: Boolean,
		default:false
	},
	isReviewed: {
		type: Boolean,
		default:false
	},
	isIssued: {
		type: Boolean,
		default:false
	},
	},
	
	{
		timestamps: true
	}
);
module.exports = mongoose.model('Request', permitSchema);
