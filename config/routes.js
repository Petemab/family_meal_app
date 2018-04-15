const router = require('express').Router();
const registrations = require('../controllers/registrations');
const sessions = require('../controllers/sessions')



// route to home, about and contact
router.get('/', (req, res) => res.render('home'));
router.get('/about', (req, res) => res.render('about'));
router.get('/contact', (req, res) => res.render('contact'));


/////////Route to /Restaurants


///////Route to adding new restaurant




//////route to  restaurant reveiw/user reviews? (by ID?)



/////route to users?

//authentication

router.route('/signup')
  .get(registrations.new)
  .post(registrations.create);

router.route('/login')
  .get(sessions.new)
  .post(sessions.create)

router.route('/logout')
  .get(sessions.delete)

// end authentication




////route to


module.exports = router;
