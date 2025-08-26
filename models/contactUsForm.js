const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  nameC: String,
  phone: String,
  email: String,
  message: String,
}, {
  collection: 'contactUs', 
});

module.exports = mongoose.model('contactUsForm', contactSchema);
