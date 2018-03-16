var React = require('react');
var api = require('../util/api');

class Details extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      forecast: this.props.state
    }
  }
  render(){
    const {forecast} = this.state;
    console.log('props in details:\n'+JSON.stringify(this.props));
    console.log('Forecastin details:\n'+JSON.stringify(forecast));
    return (
      <div className='result-container'>
          Details:{JSON.stringify(forecast)}
      </div>
    )
  }
}
module.exports = Details;
