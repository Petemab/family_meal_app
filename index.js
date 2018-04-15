//----------------Big list of dependecies-------------
const express        = require('express');
const app            = express();
const morgan         = require('morgan');
const expressLayouts = require('express-ejs-layouts');
const mongoose       = require('mongoose');


const {port, databaseURI} = require('./config/environment');
const routes = require('./config/routes');

app.set('view engine', 'ejs');
app.set('views', `${__dirname}/views`);
app.use(express.static(`${__dirname}/public`));


app.use(morgan('dev'));
app.use(expressLayouts);





app.use(routes);



app.listen(port, () => console.log(`Running on port${port}`));
