var React = require('react');
var api = require('../util/api');
var PropTypes = require('prop-types');
var ReactRouter = require('react-router-dom');
var helper = require('../util/helpers');
var Details = require('./Details');

var ControlLabel = require('react-bootstrap/lib/ControlLabel');
var Table = require('react-bootstrap/lib/Table');
var Well = require('react-bootstrap/lib/Well');

class Forecast extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      loading:true,
      forecast:[],
      err: ''
    }

    this.getWeather = this.getWeather.bind(this);
    this.getCityAdress = this.getCityAdress.bind(this);
  }

  componentDidMount(){
    this.getWeather(this.props);
  }

  componentWillReceiveProps(newProps){
    this.getWeather(newProps);
  }

  getCityAdress(cityDetails){
    //console.log(JSON.stringify(cityDetails));
    return cityDetails[0].types[0]==='postal_code'||'street_number'?
      cityDetails[1].long_name+','
            +cityDetails[cityDetails.length-2].short_name
      :
      cityDetails[0].long_name+','
            +cityDetails[cityDetails.length-2].short_name
  }

  getWeather(props){
    this.setState(function(){
      return{
        loading: true,
        err: ''
      }
    })

    api.getLocation(props.location.search.split('=')[1].replace(' ',''))
      .then(function(response){
        //console.log(JSON.stringify(response.data.results[0].address_components[response.data.results[0].address_components.length-1].short_name));
        response.status === 200?
        api.getForecast(response.data.results[0].geometry.location.lat,response.data.results[0].geometry.location.lng)
          .then(function(forecast){
            this.setState(function(){
              return{
                loading: false,
                forecast:forecast.data,
                err: '',
                city: this.getCityAdress(response.data.results[0].address_components)
              }
            })
          }.bind(this)
        )
        :
        this.setState(function(){
          return{
            loading: false,
            err: response.data
          }
        })
      }.bind(this));
  }

  render(){
    const {loading, forecast, err} = this.state;
    const dailyForecast = JSON.parse(JSON.stringify(this.state.forecast));
    var key = 'name';
    //console.log('state:'+JSON.stringify(dailyForecast));
    return loading === true
    ?<div className='forecast-loading'></div>
    : !err?
    <div className='forecast-container'>
      <div className='forecast-heading-container'>
        <h1 className='city-name'>{this.state.city}</h1>
        <div className='forecast-summary-conatiner'>
          {this.state.forecast.daily.summary}
        </div>
      </div>
        <div className='forecast-details-container'>
            {dailyForecast.daily.data.map((daily, index)=>
              index<5?
              <Details state={daily} key={daily.time}/>
              :<div key={daily.time}></div>
            )
          }
        </div>
    </div>
    :<div className='err'>
        <h1 className='err-msg'> {err}</h1>
    </div>
  }
}


module.exports = Forecast;
