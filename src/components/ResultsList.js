import React from 'react';
import styles from './ResultsList.module.css';
import ResultsListItem from "./ResultsListItem";

const ResultsList = (props) => {
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
          <ResultsListItem
            key={departure.id}
            departure={departure}
            departureLocation={departureLocation}
            formatTime={formatTime}
            formatPrice={formatPrice}
          />
        )
      })}
    </ul>
  );
};

export default ResultsList;