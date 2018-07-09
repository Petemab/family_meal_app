//----------------Big list of dependecies-------------
const express        = require('express');
const app            = express();
const morgan         = require('morgan');
const expressLayouts = require('express-ejs-layouts');
const bodyParser     = require('body-parser');
const mongoose       = require('mongoose');
const session        = require('express-session');
const methodOverride = require('method-override');
const flash = require('express-flash');
const User = require('./models/user');
const {port, databaseURI} = require('./config/environment');
const routes = require('./config/routes');
const customResponses = require('./lib/customResponses');


mongoose.connect(databaseURI);


app.set('view engine', 'ejs');
app.set('views', `${__dirname}/views`);
app.use(express.static(`${__dirname}/public`));

app.use(bodyParser.urlencoded({extended: true }));
app.use(morgan('dev'));
app.use(expressLayouts);

app.use(session({
  secret: 'wordsandsecretstuff', 
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


app.use(methodOverride(function (req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    const method = req.body._method;
    delete req.body._method;
    return method;
  }
}));



app.use((err, req, res, next) =>{

  err.status = err.status || 500;
  err.message = err.message || 'Internal Server Error';
  res.status(err.status);
  res.locals.err = err;

  return res.render(`statics/${err.status}`);
});


app.use(routes);

app.listen(port, () => console.log(`Running on port${port}`));
