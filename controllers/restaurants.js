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
    .populate('comments.user')
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


function commentsCreate(req, res) {
  Restaurant
    .findById(req.params.id)
    .exec()
    .then(restaurant => {
      // adding the current user to the comment form data
      req.body.user = req.currentUser;

      // creating a new comment with the form data.
      const comment = new Comment(req.body);

      // pushing the comment into the array of comments for the photo
      restaurant.comments.push(comment);

      // saving the photo
      return  restaurant.save();
    })
    .then(restaurant => {
      // redirecting back to the photos show view
      res.redirect(`/restaurant/${restaurant._id}`);
    })
    .catch(err => console.log(err));
}

function commentsDelete(req, res) {
  // finding the photo that the comment must be added to
  Restaurant
    .findById(req.params.restaurantId)
    .exec()
    .then(restaurant => {
      // finding comment to delete by it's id
      const comment = restaurant.comment.id(req.params.commentId);
      // deleting that comment
      comment.remove();

      // saving the photo
      return restaurant.save();
    })
    .then(restaurant => {
      // redirecting back to the photos show view
      res.redirect(`/restaurant/${restaurant._id}`);
    })
    .catch(err => console.log(err));
}


module.exports ={
  new: restaurantNew,
  create: restaurantCreate,
  index: restaurantIndex,
  show: restaurantShow,
  edit: restaurantEdit,
  update: restaurantUpdate,
  delete: restaurantDelete,
  createComment: commentsCreate,
  deleteComment: commentsDelete


};
