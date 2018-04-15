const User = require('../models/user');

function newRoute(req, res) {
  res.render('registrations/index');
}

function createRoute(req, res, next){
  User
    .create(req.body)
    .then((user) => res.redirect('/'))
    .catch(next);
}

module.exports = {
  new: newRoute,
  create: createRoute
};
