import React from 'react';
import { connect } from 'react-redux';

const ResultsContainer = (props) => {

  function formatPrice(price){
    return (price/100).toFixed(2)
  }

  function formatTime(date){
    const newTime = new Date(date);
    return newTime.getHours() + ':' + (newTime.getMinutes() < 10 ? '0' : '') + newTime.getMinutes();
  }

  function formatDate(date){
    const newDate = new Date(date);
    const day =  (newDate.getUTCDay() < 10 ? '0' : '') + newDate.getUTCDate();
    const month = (newDate.getUTCMonth()< 10 ? '0' : '') + newDate.getUTCMonth();
    const year = newDate.getFullYear();
    return `${year}-${month}-${day}`;
  }

  if(props.departures.length === 0) {
    return <p>Loading...</p>
  }

  const departureCity = props.cities.filter( city => city.id === props.origin_city_id);
  const destinationCity = props.cities.filter( city => city.id === props.destination_city_id);

  return (
    <ul>
      {props.departures.map( departure => (
        <li key={departure.id}>
          <p>Departure: {departureCity[0].name} - {props.locations.filter(elem => {
            return elem.id === departure.origin_location_id
          })[0].address[0]}</p>
          <p>Destination: {destinationCity[0].name}</p>
          <p>Price: ${formatPrice(departure.prices.total)}</p>
          <p>Departure Date: {formatDate(departure.departure_time)}</p> 
          <p>Departure Time: {formatTime(departure.departure_time)}</p>
          <p>Arrival Time: {formatTime(departure.arrival_time)}</p>
          <button>Select</button>
        </li>
      ))}
    </ul>
  );
};

const mapStateToProps = state => ({
  cities: state.cities,
  departures: state.departures,
  destination_city_id: state.destination_city_id,
  origin_city_id: state.origin_city_id,
  locations: state.locations,
})

export default connect(mapStateToProps)(ResultsContainer);