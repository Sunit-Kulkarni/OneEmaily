const express = require('express');
require('./services/passport');

const app = express(); //generates new running express app. We will only be using a single app

require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 5000; //dynamic port binding for heroku or dev environment
app.listen(PORT);
