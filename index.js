//----------------Big list of dependecies-------------
const express        = require('express');
const app            = express();
const morgan         = require('morgan');
const expressLayouts = require('express-ejs-layouts');
const mongoose       = require('mongoose');
const session        = require('express-session');
const flash = require('express-flash');
const User = require('./models/user');



const {port, databaseURI} = require('./config/environment');
const routes = require('./config/routes');
const customResponses = require('./lib/customResponses');

app.set('view engine', 'ejs');
app.set('views', `${__dirname}/views`);
app.use(express.static(`${__dirname}/public`));

// app.use(bodyParser.urlencoded({extended: true }));

app.use(session({
  secret: 'wordsandsecretstuff', //what goes here? Why?
  resave: false,
  saveUninitialized: false
}));

app.use(flash());
app.use(customResponses);



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


app.use((err, req, res, next) =>{

  err.status = err.status || 500;
  err.message = err.message || 'Internal Server Error';
  res.status(err.status);
  res.locals.err = err;

  return res.render(`statics/${err.status}`);
});



app.listen(port, () => console.log(`Running on port${port}`));
