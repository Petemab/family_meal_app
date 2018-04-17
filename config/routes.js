const router = require('express').Router();
const registrations = require('../controllers/registrations');
const sessions = require('../controllers/sessions');
const restaurants = require('../controllers/restaurants');
const users = require('../controllers/sessions');



// route to home, about and contact
router.get('/', (req, res) => res.render('home'));
router.get('/about', (req, res) => res.render('about'));
router.get('/contact', (req, res) => res.render('contact'));



function secureRoute(req, res, next){
  if(!req.session.userId){
    return req.session.regenerate(() =>{
      req.flash('danger', 'You must be logged in');
      res.redirect('/');
    });
  }
  return next();
}
/////////Route to /Restaurants
router.route('/restaurants')
  .get(restaurants.index)
  .post(secureRoute,restaurants.create);

///////Route to adding new and posting it restaurant
router.route('/restaurants/new')
  .get(secureRoute, restaurants.new);


router.route('/restaurants/:id')
  .get(restaurants.show)
  .put(secureRoute, restaurants.update)
  .delete(secureRoute, restaurants.delete);

router.route('/restaurants/:id/edit')
  .get(secureRoute, restaurants.edit);

router.route('/restaurants/:id/comments')
  .post(restaurants.commentsCreate);

router.route('/restaurants/:restaurantId/comments/:commentId')
  .delete(restaurants.commentsDelete);  

//////route to  restaurant reveiw/user reviews? (by ID?)



/////route to users?

//authentication and users

router.route('/signup')
  .get(registrations.new)
  .post(registrations.create);

router.route('/login')
  .get(sessions.new)
  .post(sessions.create);

router.route('/logout')
  .get(sessions.delete);

router.route('/users')
  .get(users.index);

router.route('/users/:id')
  .get(users.show)
  .delete(users.deleteUser);
//   .put(.update);
//   .get(.edit);


// end authentication




////route to


module.exports = router;
