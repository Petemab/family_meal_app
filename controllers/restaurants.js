const Restaurant = require('../models/restaurant')


function restaurantNew(req, res){
  res.render('restaurants/new', {error: null});
}




module.exports ={
 new: restaurantNew

};
