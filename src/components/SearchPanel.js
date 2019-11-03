import React from 'react';
import { connect } from 'react-redux';
import { fetchData } from '../actions/actions';

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
    adults: 1
  };

  function submitHandler(){
    const params = `${search.departure.geohash}/${search.destination.geohash}/${search.date}`;
    props.fetchData(params);
  }

  return (
    <div>
      <h3>From: <strong>{search.departure.city}</strong> to <strong>{search.destination.city}</strong></h3>
      <p>Date: {search.date}</p>
      <p>Passengers: {search.adults}</p>
      <button onClick={submitHandler}>Search</button>
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    fetchData: (params) => dispatch(fetchData(params)),
  };
};

const mapStateToProps = state => {
  return {
    complete: state.complete,
    departures: state.departures,
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchPanel);