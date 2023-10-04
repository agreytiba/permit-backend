const mongoose = require('mongoose');

const permitSchema = mongoose.Schema(
  {
          user:{
            type: mongoose.Schema.Types.ObjectId, 
            required: true,
            ref: 'user'
        },
          work:{
            type: mongoose.Schema.Types.ObjectId, 
            required: true,
            ref: 'Work'
        },
          safety:{
            type: mongoose.Schema.Types.ObjectId, 
            required: true,
            ref: 'Safety'
        },
          risk:{
            type: mongoose.Schema.Types.ObjectId, 
            required: true,
            ref: 'Risk'
        },

	},
	{
		timestamps: true
	}
);
module.exports = mongoose.model('Permit', permitSchema);
