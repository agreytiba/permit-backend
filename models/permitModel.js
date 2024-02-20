const mongoose = require('mongoose');

const permitSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'user'
    },
    permitStatus:{ type: String,required:true,default:'Received'},
    work: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Work'
    },
    safety: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Safety'
    },
   
    risk: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Risk'
    },
    attachments: [],
    review: [],
    approve: []
	},
	{
		timestamps: true
	}
);
module.exports = mongoose.model('Permit', permitSchema);
