var React = require('react');
var ReactRouter = require('react-router-dom');
var Search = require('./Search');
var Forecast = require('./Forecast');
var BrowserRouter = ReactRouter.BrowserRouter;
var Route = ReactRouter.Route;

class App extends React.Component{
  render () {
    return(
    <BrowserRouter>
      <div className='container'>
          <div className='search-container'>
            <Route path='/' component={Search} />
          </div>
          <div className='forecast-container'>
            <Route path='/forecast' component={Forecast} />
          </div>
      </div>
    </BrowserRouter>
    )
  }
}

module.exports = App;
