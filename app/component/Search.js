var React = require('react');
var api = require('../util/api');
var PropTypes = require('prop-types');
var ReactRouter = require('react-router-dom');

var Button = require('react-bootstrap/lib/Button');
var Form = require('react-bootstrap/lib/Form');
var FormControl = require('react-bootstrap/lib/FormControl');
var FormGroup = require('react-bootstrap/lib/FormGroup');
var ControlLabel = require('react-bootstrap/lib/ControlLabel');
var Radio = require('react-bootstrap/lib/Radio');

class Forecast extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      city:'',
      unit:'fahrenheit'
    }
    this.changeHandler = this.changeHandler.bind(this);
    this.clickHandler = this.clickHandler.bind(this);
  }

  clickHandler(props) {
    this.props.history.push({
      pathname: '/forecast',
      search: '?city='+this.state.city,
    });
  }

  changeHandler(event){
    var change = {}
    change[event.target.name] = event.target.value;
    this.setState(change);
  }
  render(){
    const {city} = this.state;
    const {changeHandler, clickHandler} = this;
    //console.log('state in render:\n'+JSON.stringify(this.state));
    return (
      <div className='search-container'>
      <Form>
        <FormGroup className='search-container'>
          <ControlLabel>Enter City  or Zipcode  </ControlLabel>
          <FormControl
            type='text'
            placeholder='Binghamton'
            onChange={changeHandler}
            name='city'
          />
          <Button
            onClick={clickHandler}
            active>
            Get Weather
          </Button>
        </FormGroup>
      </Form>
    </div>
    )
  }
}


module.exports = Forecast;
