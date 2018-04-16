const Restaurant = require('../models/restaurant');

function restaurantIndex(req, res){
  Restaurant
    .find()
    // .populate('')
    .exec()
    .then(restaurants => {
      res.render('restaurants/index', {restaurants});
    });
}



function restaurantNew(req, res){
  res.render('restaurants/new', {error: null});
}

function restaurantCreate(req, res){
  // req.body.user= req.currentUser;

  Restaurant
    .create(req.body)
    .then(() => res.redirect('/restaurants'))
    .catch((error) =>{
      if(error.name === 'ValidationError'){
        return res.badRequest('/restaurants/new', error.toString());
      }
    });
}


module.exports ={
  new: restaurantNew,
  create: restaurantCreate,
  index: restaurantIndex

};
