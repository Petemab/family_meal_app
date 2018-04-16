const router = require('express').Router();
const registrations = require('../controllers/registrations');
const sessions = require('../controllers/sessions');
const restaurants = require('../controllers/restaurants');



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
  .post(restaurants.create);

///////Route to adding new and posting it restaurant
router.route('/restaurants/new')
  .get(restaurants.new);
// .post(restaurants.create);



//////route to  restaurant reveiw/user reviews? (by ID?)



/////route to users?

//authentication

router.route('/signup')
  .get(registrations.new)
  .post(registrations.create);

router.route('/login')
  .get(sessions.new)
  .post(sessions.create);

router.route('/logout')
  .get(sessions.delete);

router.route('users/:id')
  .get(.show)
  .delete(.delete)
  .put(.update);
  .get(.edit);


// end authentication




////route to


module.exports = router;
