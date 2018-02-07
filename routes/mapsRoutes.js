//This isn't working quite yet. Need frontend setup first.
//Not quite making geocode work yet
const keys = require('../config/keys');
const requireLogin = require('../middlewares/requireLogin');

const googleMapsClient = require('@google/maps').createClient({
  key: keys.googleMapsKey
}); //created new client object

module.exports = app => {
  app.get('/map/cities', async (req, res) => {
    var test = googleMapsClient.geocode({
      address: '100 Aaron Way, North Wales, PA'
    });
  });
  //testing with a get method for now. will be a post for selecting cities
};
