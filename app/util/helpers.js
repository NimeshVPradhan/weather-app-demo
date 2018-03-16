var months = {
  Jan: 'January',
  Feb: 'February',
  Mar: 'March',
  Apr:'April',
  May:'May',
  Jun:'June',
  Jul:'July',
  Aug:'August',
  Sep:'September',
  Oct:'October',
  Nov:'November',
  Dec:'December'
};
var days = {
  Mon:'Monday',
  Tue:'Tuesday',
  Wed:'Wednesday',
  Thu:'Thursday',
  Fri:'Friday',
  Sat:'Saturday',
  Sun:'Sunday'
}
function getDate(unix_timestamp){
  var date = new Date(unix_timestamp*1000);
  var GMTdate = date.toGMTString().split(' ');
  return days[GMTdate[0].split(',')[0]]+', '+GMTdate[1]+' '+months[GMTdate[2]];
}

function getTemp(value,temp){
  return value===0?temp+' F':((temp - 31)/1.8).toFixed(2)+' °C';
}

module.exports ={
  getDate:getDate,
  getTemp: getTemp
}
