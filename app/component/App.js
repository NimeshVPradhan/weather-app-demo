var React = require('react');
var ReactRouter = require('react-router-dom');
var Search = require('./Search');
var Forecast = require('./Forecast');
var CurrentWeather = require('./CurrentWeather');

var BrowserRouter = ReactRouter.BrowserRouter;
var Route = ReactRouter.Route;

class App extends React.Component{
  render () {
    return(
    <BrowserRouter>
      <div className='container'>
          <Route path='/' component={Search} />
          <Route exact path='/' component={CurrentWeather} />
          <Route path='/forecast' component={Forecast} />
      </div>
    </BrowserRouter>
    )
  }
}

module.exports = App;
