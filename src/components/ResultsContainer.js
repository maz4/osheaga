import React from 'react';
import { connect } from 'react-redux';

const ResultsContainer = (props) => {
  const {cities, departures, destination_city_id, origin_city_id, locations, complete } = props;

  function formatPrice(price){
    return (price/100).toFixed(2)
  }

  function formatTime(date){
    const time = new Date(date);
    return `${time.getHours()}:${time.getMinutes() < 10 ? '0' : ''}${time.getMinutes()}`;
  }

  function formatDate(date){
    const newDate = new Date(date);
    const day =  (newDate.getUTCDay() < 10 ? '0' : '') + newDate.getUTCDate();
    const month = (newDate.getUTCMonth()< 10 ? '0' : '') + newDate.getUTCMonth();
    const year = newDate.getFullYear();
    return `${year}-${month}-${day}`;
  }

  if(!complete) {
    return <p>Loading...</p>
  }

  const departureCity = cities.filter( city => city.id === origin_city_id);
  const destinationCity = cities.filter( city => city.id === destination_city_id);

  return (
    <ul>
      {departures.map( departure => (
        <li key={departure.id}>
          <p>{departureCity && departureCity[0].name} - {locations.filter(elem => {
            return elem.id === departure.origin_location_id;
          })[0].address[0]} to {departureCity && destinationCity[0].name}</p>
          <p>Departure Time: {formatTime(departure.departure_time)}</p>
          <p>Arrival Time: {formatTime(departure.arrival_time)}</p>
          <p>Price: ${formatPrice(departure.prices.total)}</p>
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
  complete: state.complete
});

export default connect(mapStateToProps)(ResultsContainer);