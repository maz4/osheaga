import React from "react";
import styles from "./ResultsListItem.module.css";

const ResultsListItem = (props) => {
  const {departure, departureLocation, formatTime, formatPrice} =props;

  return (
    <li className={styles.ResultsList__item}>
      <p>Departure Location: {departureLocation}</p>
      <p>Departure Time: {formatTime(departure.departure_time)}</p>
      <p>Arrival Time: {formatTime(departure.arrival_time)}</p>
      <p>Price: ${formatPrice(departure.prices.total)}</p>
      <button className={styles.button}>Select</button>
    </li>
  )
}

export default ResultsListItem;