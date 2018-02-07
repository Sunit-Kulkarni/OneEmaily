const keys = require('../config/keys');
const requireLogin = require('../middlewares/requireLogin');

const googleMapsClient = require('@google/maps').createClient({
  key: keys.googleMapsKey
}); //created new client object

module.exports = app => {
  app.get('/map/cities', async (req, res) => {
    var test = googleMapsClient.geocode(
      {
        address: '1600 Amphitheatre Parkway, Mountain View, CA'
      },
      function(err, response) {
        if (!err) {
          //response = response.json.results;
          console.log(response);
          res.send(response);
        }
      }
    );
    console.log(test);
  });
  //testing with a get method for now. will be a post for selecting cities
};
