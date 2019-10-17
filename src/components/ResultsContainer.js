import React from 'react';
import { connect } from 'react-redux';

const ResultsContainer = (props) => {
  if(!props.busData) {
    return <p>Loading...</p>
  }

  const departureCity = props.busData.cities.filter( city => city.id === props.busData.origin_city_id);
  const destinationCity = props.busData.cities.filter( city => city.id === props.busData.destination_city_id);

  return (
    <ul>
      {props.busData.locations.map( location => (
        <li key={location.id}>
          <p>Departure city: {departureCity[0].name}</p>
          <p>Destination: {destinationCity[0].name}</p>
          <p>Departure place: {location.name}</p>
          <p>Address: {location.address}</p>
        </li>
      ))}

      <li>
        <h2>Departure from:</h2>
        <p>New York</p>
        <h2>Destination:</h2>
        <p>Montréal</p>
        <button>Select</button>
      </li>
    </ul>
  );
};

// const mapStateToProps = state => console.log(state)
const mapStateToProps = state => ({
  busData: state.busData
})

export default connect(mapStateToProps)(ResultsContainer);