const User = require('../models/user');

function newRoute(req, res) {
  res.render('sessions/index');
}

function createRoute(req, res, next) {
  User
    .findOne({ email: req.body.email })
    .then(user => {
      if(!user || !user.validatePassword(req.body.password)) {
        req.flash('danger', 'WRONG CREDENTIALS');
        res.status(401).render('sessions/index');
      }
      req.session.userId = user._id;
      res.redirect('/'); // otherwise send them to the homepage?
    })
    .catch(next);
}

// Hopefully this will allow me to render a users index page
// function indexRoute(req, res) {
//   return User
//     .find()
//     .exec()
//     .then(users => res.render('users/index', { users })) // pass the users into the index template
//     .catch(err => {
//       console.log(err); // log the error
//       return res.sendStatus(500); // send a 500 response
//     });
// }



function deleteRoute(req, res){
  return req.session.regenerate(() => res.redirect('/'));
}


module.exports = {
  new: newRoute,
  create: createRoute,
  // index: indexRoute,
  delete: deleteRoute
};
