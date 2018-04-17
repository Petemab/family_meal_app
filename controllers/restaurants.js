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

function restaurantShow(req, res){
  Restaurant
    .findById(req.params.id)
    .populate('user')
    .exec()
    .then(restaurant => res.render('restaurants/show', {restaurant}));
}

function restaurantNew(req, res){
  res.render('restaurants/new', {error: null});
}

function restaurantCreate(req, res){
  req.body.user = req.currentUser;

  Restaurant
    .create(req.body)
    .then(() => res.redirect('/restaurants'))
    .catch((error) =>{
      if(error.name === 'ValidationError'){
        return res.badRequest('/restaurants/new', error.toString());
      }
    });
}

function restaurantEdit(req, res){
  Restaurant
    .findById(req.params.id)
  // .populate('')
    .exec()
    .then(restaurant => res.render('restaurants/edit', {restaurant}));
}

function restaurantUpdate(req, res){
  Restaurant
    .exec()
    .then(restaurant => {
      restaurant = Object.assign(restaurant, req.body);
      return restaurant.save();
    })
    .then(restaurant => res.redirect(`/restaurants/${restaurant._id}`));
}

function restaurantDelete(req, res){
  Restaurant
    .findById(req.params.id)
    .exec()
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/restaurants'));
}



module.exports ={
  new: restaurantNew,
  create: restaurantCreate,
  index: restaurantIndex,
  show: restaurantShow,
  edit: restaurantEdit,
  update: restaurantUpdate,
  delete: restaurantDelete

};
