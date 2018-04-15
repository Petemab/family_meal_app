//----------------Big list of dependecies-------------
const express        = require('express');
const app            = express();
const morgan         = require('morgan');
const expressLayouts = require('express-ejs-layouts');
const mongoose       = require('mongoose');
const session        = require('express-session');



const {port, databaseURI} = require('./config/environment');
const routes = require('./config/routes');

app.set('view engine', 'ejs');
app.set('views', `${__dirname}/views`);
app.use(express.static(`${__dirname}/public`));

// app.use(bodyParser.urlencoded({extended: true }));

app.use(session({
  secret: 'wordsandsecretstuff', //what goes here? Why?
  resave: false,
  saveUninitialized: false
}));

app.use((req, res, next) => {
  if(!req.session.userId) return next();
  User
    .findById(req.session.userId)
    .then(user => {
      if(!user) req.session.regenerate(() => res.redirect('/login'));
      res.locals.isAuthenticated = true;
      res.locals.currentUser = user;
      req.currentUser = user;
      next();
    });
});

app.use(morgan('dev'));
app.use(expressLayouts);





app.use(routes);



app.listen(port, () => console.log(`Running on port${port}`));
