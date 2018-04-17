const mongoose = require('mongoose');


//review model
// const reviewSchema = new mongoose.Schema({
//   headline: String,
//   familyFriendlyRating: {type: String, required: true},
//   review: String
//
// });



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
  review: String,
  user: {type: mongoose.Schema.ObjectId, ref: 'User'}
});


module.exports = mongoose.model('Restaurant', restaurantSchema);
