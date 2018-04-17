const mongoose  = require('mongoose');
mongoose.Promise = require('bluebird');

const { databaseURI } = require('../config/environment');
mongoose.connect(databaseURI);

const Restaurant = require('../models/restaurant');


Restaurant.collection.drop();
