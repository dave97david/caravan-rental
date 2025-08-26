const mongoose = require('mongoose');

const caravanSchema = new mongoose.Schema({
  title: String,
  price: String,
  location: String,
  name: String,
  date: Date,
});

module.exports = mongoose.model('Caravan', caravanSchema);
