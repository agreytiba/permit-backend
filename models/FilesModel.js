const mongoose = require('mongoose');

const uploadSchema = mongoose.Schema(
	{
		filename: {
			type: String,
			required: [true, "no file name"]
		},
		data: {
			type: Buffer,
			required: [true, "no data buffer"]
		}
	},
	{
		timestamps: true
	}
);
module.exports = mongoose.model('PDF', uploadSchema);