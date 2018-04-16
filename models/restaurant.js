const mongoose = require('mongoose');


const restaurantSchema = new mongoose.Schema({
  name: {type: String, required: true},
  imageURL: String,
  address: {type: String, required: true},
  postcode: String,
  phoneNumber: String,
  website: String,
  cuisine: String,
  foodRating: {type: Number, min: 1, max: 10, default: 5},
  // kidsMenu: Boolean,
  // highChairs: Boolean,
  entertainment: String,
  familyFriendlyRating: {type: Number, min: 1, max: 10, default: 5},
  review: String
});


module.exports = mongoose.model('Restaurant', restaurantSchema);
