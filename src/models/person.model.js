const mongoose = require('mongoose');

/** This is a model for mongoose */
const personSchema = new mongoose.Schema({
  name: String,
  price: String,
});

const Person = mongoose.model('Person', personSchema);

module.exports = Person;