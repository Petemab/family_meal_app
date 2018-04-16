


const User = require('../models/user');
// const flash = require('express-flash');

function newRoute(req, res) {
  res.render('registrations/index');
}

// ---------------------------Create a new User account--------------------------

function createRoute(req, res){
  User
    .create(req.body)
    .then(() => {
      res.redirect('/');
    })
    // --If the entered fields are not the same as the model then throw an error-
    .catch((err) => {
      if(err.name === 'ValidationError'){ //This is just what mongodb calls a validation error - if the stuff the user input does not match the criteria set out in the model.
        req.flash('danger', 'You must be logged in');
        return res.status(400).render('registrations/index');
      }
    });
}

module.exports = {
  new: newRoute,
  create: createRoute
};
