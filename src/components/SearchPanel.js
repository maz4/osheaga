import React from 'react';
import styles from './SearchPanel.module.css';

const SearchPanel = (props) => {
  const {search, submitHandler} = props;

  return (
    <div className={styles.SearchPanel}>
      <h3 className={styles.SearchPanel__Header}>Bus From: {search.departure.city}</h3>
      <h3 className={styles.SearchPanel__Header}>To: {search.destination.city}</h3>
      <p className={styles.SearchPanel__Date}>Date: {search.date}</p>
      <p className={styles.SearchPanel__Passangers}>Passengers: {search.adults}</p>
      <button className={styles.button} onClick={submitHandler}>Search</button>
    </div>
  );
};

export default SearchPanel;