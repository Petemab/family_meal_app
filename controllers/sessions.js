const User = require('../models/user');

function newRoute(req, res) {
  res.render('sessions/index');
}

function createRoute(req, res, next) {
  User
    .findOne({ email: req.body.email })
    .then(user => {
      if(!user || !user.validatePassword(req.body.password)) {
        return res.redirect('/login'); // Need to add error message
      }
      req.session.userId = user._id;
      res.redirect('/'); // otherwise send them to the homepage?
    })
    .catch(next);
}

function deleteRoute(req, res){
  return req.session.regenerate(() => res.redirect('/'));
}


module.exports = {
  new: newRoute,
  create: createRoute,
  delete: deleteRoute
};
