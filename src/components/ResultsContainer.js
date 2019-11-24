import React from 'react';
import { connect } from 'react-redux';
import styles from './ResultsContainer.module.css';

const ResultsContainer = (props) => {
  const {departures, locations } = props;

  function formatPrice(price){
    return (price/100).toFixed(2)
  }

  function formatTime(date){
    const time = new Date(date);
    return `${time.getHours()}:${time.getMinutes() < 10 ? '0' : ''}${time.getMinutes()}`;
  }

  if(departures.length === 0) {
    return null;
  }

  return (
    <ul className={styles.ResultsList}>
      {departures.map(departure => {
        const departureLocation = locations.filter(elem => elem.id === departure.origin_location_id)[0].address[0];

        return (
          <li className={styles.ResultsList__element} key={departure.id}>
            <p>Departure Location: {departureLocation}</p>
            <p>Departure Time: {formatTime(departure.departure_time)}</p>
            <p>Arrival Time: {formatTime(departure.arrival_time)}</p>
            <p>Price: ${formatPrice(departure.prices.total)}</p>
            <button className={styles.button}>Select</button>
          </li>
        )
      })}
    </ul>
  );
};

const mapStateToProps = state => ({
  departures: state.departures,
  locations: state.locations,
});

export default connect(mapStateToProps)(ResultsContainer);