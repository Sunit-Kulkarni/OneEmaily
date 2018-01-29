const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
require('./models/user');
require('./models/Survey');
require('./services/passport');

mongoose.connect(keys.mongoURI);

const app = express(); //generates new running express app. We will only be using a single app

app.use(bodyParser.json()); //parses body from a request and assign to req.body property

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
require('./routes/billingRoutes')(app);
require('./routes/surveyRoutes')(app);

if (process.env.NODE_ENV === 'production') {
  // Express will serve up production assests
  // like our main.js file, or main.css file!
  app.use(express.static('../client/build'));

  // Express will serve up the index.html file
  // if it doesn't recognize the route
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build/index.html'));
  });
}

const PORT = process.env.PORT || 5000; //dynamic port binding for heroku or dev environment
app.listen(PORT);
