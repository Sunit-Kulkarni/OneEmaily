const express = require("express");
const app = express(); //generates new running express app. We will only be using a single app

app.get("/", (req, res) => {
  res.send({ hi: "there buddy" });
});

const PORT = process.env.PORT || 5000; //dynamic port binding for heroku or dev environment
app.listen(PORT);
