const mongoose = require('mongoose');

const pnumberSchema = mongoose.Schema(
  {
    permitNo: {
      type: String,
      required: true,
    },
    permit: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Permit'
    },
	},
	{
		timestamps: true
	}
);
module.exports = mongoose.model('Pnumber', pnumberSchema);
