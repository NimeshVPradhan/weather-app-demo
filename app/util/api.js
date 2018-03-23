var axios = require('axios');

var _baseURL = 'http://api.openweathermap.org/data/2.5/';
var _baseLocationURL = 'https://maps.googleapis.com/maps/api/geocode/';
var _baseWeatherUrl = 'https://api.darksky.net/forecast/';
var _geolocationUrl = 'https://www.googleapis.com/geolocation/v1/geolocate?key=';
var _proxyURL = 'https://crossorigin.me/'

var _WEATHERAPIKEY = 'd850e3dcd69c58f6b716b3d988ac7b92';
var _GEOCODINGAPIKEY = 'AIzaSyCmpYGELHuHRyLI7PSwXJayzctWtc_LI-s';
var _GEOLOCATIONAPIKEY = 'AIzaSyDrZ_JYwpCQqheWm87NofSvllLv9MOAYdk';
//https://maps.googleapis.com/maps/api/geocode/json?address=sanpada&key=AIzaSyB8RgReBr9aM22ISjWAH6RWDWAtQJMQ0AQ
//https://api.darksky.net/forecast/d850e3dcd69c58f6b716b3d988ac7b92/37.8267,-122.4233
//https://maps.googleapis.com/maps/api/geocode/json?latlng=40.714224,-73.961452&key=YOUR_API_KEY

function getGeocodingQueryString(city,lat,lng){
  return city? {
      address : city,
      key : _GEOCODINGAPIKEY
    }
    :
    {
      latlng : lat+','+lng,
      key : _GEOCODINGAPIKEY
    }
}

function getLocationUrl(responseFormat,city){
  var queryString = getGeocodingQueryString(city);
  var locationUrl = _baseLocationURL
                    + responseFormat + '?'
                    + Object.keys(queryString)
                      .map(function (key){
                        return key + '=' + queryString[key]
                      }).join('&');
  console.log(locationUrl);
  return locationUrl;
}

function getReverseLocationUrl(responseFormat,lat,lng){
  var queryString = getGeocodingQueryString('',lat,lng);
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
          data: 'Sorry, we could not find your city, '+city
        }
    }).catch(function(err){
      return err;
    })
}

function getCity(lat,lng){
  var url = _proxyURL + getReverseLocationUrl('json', lat,lng);
  return axios.get(url)
    .then(function (locationData){
      //console.log(JSON.stringify(locationData.data));
        return locationData
    })
}

function getCurrentLocation(){
  var url = _geolocationUrl+_GEOLOCATIONAPIKEY;
  return axios.post(url)
    .then(function(location){
      //console.log('from api:'+JSON.stringify(location));
      return location;
    }).catch(function(err){
      //console.log('from api err:'+err);
      return {
        status:404,
        err: 'Sorry, we could not find your current location'
      };
    })
}

function getForecast(lat, lng){
  var url = _proxyURL + getForecastUrl(lat, lng, 'exclude=minutely,currently,hourly');
  return axios.get(url)
    .then(function(forecastData){
      console.log(JSON.stringify(forecastData.status));
      return forecastData;
    }).catch(function(err){
      return {
        status:404,
        err: 'Sorry, we could not get weather forecast'
      };
    })
}


function getCurrentWeather(lat, lng){
  var url = _proxyURL + getForecastUrl(lat, lng, 'exclude=minutely,daily,hourly');
  return axios.get(url)
    .then(function(forecastData){
      //console.log(JSON.stringify(forecastData.status));
      return forecastData;
    }).catch(function(err){
      return {
        status:404,
        err: 'Sorry, we could not find current weather near you'
      };
    })
}

module.exports = {
  getLocation : getLocation,
  getForecast : getForecast,
  getCurrentLocation : getCurrentLocation,
  getCurrentWeather : getCurrentWeather,
  getCity : getCity
}
