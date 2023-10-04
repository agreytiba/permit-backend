const mongoose = require('mongoose');

const signatureSchema = new mongoose.Schema({
  signatureData: String, // Store the image data as a Buffer
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // This should be the name of your user model
    required: true,
  },
});

module.exports = mongoose.model('Signature', signatureSchema);

