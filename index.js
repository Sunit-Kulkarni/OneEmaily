const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
require('./models/user');
require('./services/passport');

mongoose.connect(keys.mongoURI);

const app = express(); //generates new running express app. We will only be using a single app

app.use(
  //wiring up middleware to our application.
  //small functions that can be used to modify incoming requests before they are sent off to route handler
  cookieSession({
    maxAge: 30 * 24 * 60 * 1000,
    keys: [keys.cookieKey] //will encrypt cookie session
  })
);

app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 5000; //dynamic port binding for heroku or dev environment
app.listen(PORT);