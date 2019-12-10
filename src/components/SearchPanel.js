import React from 'react';
import styles from './SearchPanel.module.css';

const SearchPanel = (props) => {
  const {search, submitHandler, updatePassengers} = props;

  return (
    <div className={styles.SearchPanel}>
      <h3 className={styles.SearchPanel__Header}>Bus From: {search.departure.city}</h3>
      <h3 className={styles.SearchPanel__Header}>To: {search.destination.city}</h3>
      <p className={styles.SearchPanel__Date}>Date: {search.date}</p>
      <p className={styles.SearchPanel__Passangers}>Passengers: {search.adults}</p>

      <div className={styles.SearchPanel__Inputs}>

        <div className={styles.SearchPanel__InputWrapper}>
          <label className={styles.SearchPanel__Label} htmlFor="date">Date</label>
          <input className={styles.SearchPanel__Input} type="date" id="date" value={search.date} onChange={updatePassengers}/>
        </div>

        <div className={styles.SearchPanel__InputWrapper}>
          <label className={styles.SearchPanel__Label} htmlFor="adults">Adults</label>
          <input className={styles.SearchPanel__Input} type="number" id="adults" value={search.adults} onChange={updatePassengers}/>
        </div>
        <div className={styles.SearchPanel__InputWrapper}>
          <label className={styles.SearchPanel__Label} htmlFor="seniors">Seniors</label>
          <input className={styles.SearchPanel__Input} type="number" id="seniors" value={search.seniors} onChange={updatePassengers}/>
        </div>

        <div className={styles.SearchPanel__InputWrapper}>
          <label className={styles.SearchPanel__Label} htmlFor="children">Children</label>
          <input className={styles.SearchPanel__Input} type="number" id="children" value={search.children} onChange={updatePassengers}/>
        </div>

      </div>

      <button className={styles.button} onClick={submitHandler}>Search</button>
    </div>
  );
};

export default SearchPanel;