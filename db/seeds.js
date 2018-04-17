const mongoose  = require('mongoose');
mongoose.Promise = require('bluebird');

const { databaseURI } = require('../config/environment');
mongoose.connect(databaseURI);

const Restaurant = require('../models/restaurant');


Restaurant.collection.drop();


Restaurant.create([{
  name: 'McDonalds, Leytonstone',
  imageURL: 'https://www.allinlondon.co.uk/images/venues/images_all/10640204.jpg',
  address: '865-873 High Road Leytonstone, Leytonstone London',
  postcode: 'E11 1HH' ,
  phoneNumber: '020 8530 7796',
  website: 'www.mcdonalds.com',
  cuisine: 'Fast Food',
  foodRating: 7,
  // kidsMenu: Boolean,
  // highChairs: Boolean,
  entertainment: 'Kid\'s play area and ipads!',
  familyFriendlyRating: 8,
  review: 'McDonalds, but better'
},{
  name: 'The Old Station Yard Station',
  imageURL: 'https://media-cdn.tripadvisor.com/media/photo-s/07/50/1a/42/old-station-yard-cafe.jpg',
  address: '186 Wood Street, Walthamstow',
  postcode: 'E17 3NA',
  phoneNumber: '07955 215269',
  website: 'https://www.facebook.com/OldStationYardCafe/',
  cuisine: 'Cafe / Traditional English',
  foodRating: 8,
  // kidsMenu: Boolean,
  // highChairs: Boolean,
  entertainment: 'Kids books and board games',
  familyFriendlyRating: 9,
  review: 'Lovely welcome and always look out for the kids'
}, {
  name: 'The Castle, Walthamstow',
  imageURL: 'https://themother-hood.com/wp-content/uploads/2016/07/TheCastle-e1469604295618.jpg',
  address: '15 Grosvenor Rise E, Walthamstow, London',
  postcode: 'E17 9LB',
  phoneNumber: '020 8509 8095',
  website: 'http://www.thecastlee17.com/' ,
  cuisine: 'Pub food',
  foodRating: 9,
  // kidsMenu: Boolean,
  // highChairs: Boolean,
  entertainment: 'Kids books, board games and kids menu',
  familyFriendlyRating: 7,
  review: 'Great pub, sometimes too full of buggies'
}
])

  .then(console.log('Records Created'))
  .catch(err => console.log(err))
  .finally(()=> mongoose.connection.close());
