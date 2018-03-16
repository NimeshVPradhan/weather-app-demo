var axios = require('axios');

var _baseURL = 'http://api.openweathermap.org/data/2.5/';
var _baseLocationURL = 'https://maps.googleapis.com/maps/api/geocode/';
var _baseWeatherUrl = 'https://api.darksky.net/forecast/';
var _proxyURL = 'https://crossorigin.me/'

var _APIKEY = '70d19fec49463ea96d83cf22ddbf41d5';
var _WEATHERAPIKEY = 'd850e3dcd69c58f6b716b3d988ac7b92';
var _GEOCODINGAPIKEY = 'AIzaSyCmpYGELHuHRyLI7PSwXJayzctWtc_LI-s';
//https://maps.googleapis.com/maps/api/geocode/json?address=sanpada&key=AIzaSyB8RgReBr9aM22ISjWAH6RWDWAtQJMQ0AQ
//https://api.darksky.net/forecast/d850e3dcd69c58f6b716b3d988ac7b92/37.8267,-122.4233

function getLocationUrl(responseFormat,city){
  var queryString = {
      address : city,
      key : _GEOCODINGAPIKEY
    };

  var locationUrl = _baseLocationURL
                    + responseFormat + '?'
                    + Object.keys(queryString)
                      .map(function (key){
                        return key + '=' + queryString[key]
                      }).join('&');
  console.log(locationUrl);
  return locationUrl;
}

function getForecastUrl(lat, lng, condition){
  var weatherUrl = _baseWeatherUrl + _WEATHERAPIKEY + '/' + lat + ',' + lng + '?' + condition;
  console.log(weatherUrl);
  return weatherUrl;
}

function getLocation(city){
  var url = _proxyURL + getLocationUrl('json', city);
  return axios.get(url)
    .then(function (locationData){
      //console.log(JSON.stringify(locationData.data));
        return locationData.data.status==='OK'?
        {
          status:200,
          data: locationData.data
        }
        :
        {
          status:404,
          data: 'Sorry, we could not find your location, '+city
        }
    }).catch(function(err){
      return err;
    })
}

function getForecast(lat, lng){
  var url = _proxyURL + getForecastUrl(lat, lng, 'exclude=minutely,currently,hourly');
  return axios.get(url)
    .then(function(forecastData){
      //console.log(JSON.stringify(forecastData));
      return forecastData.data;
    })
}

module.exports = {
  getLocation : getLocation,
  getForecast : getForecast
}
