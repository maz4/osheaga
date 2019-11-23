import React from 'react';
import { connect } from 'react-redux';
import { fetchData } from '../actions/actions';
import styles from './SearchPanel.module.css';

const SearchPanel = (props) => {

  const search = {
    departure: {
      geohash: 'dr5reg',
      city: 'New York'
    },
    destination: {
      geohash: 'f25dvk',
      city: 'Montreal'
    },
    date: '2020-08-02',
    adults: 1,
    seniors: 0,
    children: 0,
    currency: 'usd'
  };

  function submitHandler(){
    const url = `${search.departure.geohash}/${search.destination.geohash}/${search.date}`;
    props.fetchData({
      url,
      params: {
        adults: search.adults,
        seniors: search.seniors,
        children: search.children,
        currency: search.currency
      }
    });
  }

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

const mapDispatchToProps = dispatch => {
  return {
    fetchData: (params) => dispatch(fetchData(params)),
  };
};


export default connect(null, mapDispatchToProps)(SearchPanel);