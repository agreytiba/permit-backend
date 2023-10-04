const mongoose = require('mongoose');

const signatureSchema = new mongoose.Schema({
  imageData: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Test', signatureSchema);
