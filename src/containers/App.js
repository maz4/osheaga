import React, {useState} from 'react';
import { connect } from 'react-redux'
import SearchPanel from '../components/SearchPanel';
import ResultsList from '../components/ResultsList';
import ErrorBoundry from './ErrorBoundry'
import styles from './App.module.css';
import {fetchData} from "../actions/actions";

function App(props) {
  // const search = {
  //   departure: {
  //     geohash: 'dr5reg',
  //     city: 'New York'
  //   },
  //   destination: {
  //     geohash: 'f25dvk',
  //     city: 'Montreal'
  //   },
  //   date: '2020-08-02',
  //   adults: 1,
  //   seniors: 0,
  //   children: 0,

  //   currency: 'usd'
  // };

  const [search, setSearch] = useState({
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
  });

  function updatePassengers(event) {
    const passengerType = event.target.id;
    const value = event.target.value;
    if(parseInt(value) < 0 ){
      return;
    }
    setSearch({
      ...search,
      [passengerType]: value
    });
  }

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
    <div className={styles.App}>
      <SearchPanel search={search} submitHandler={submitHandler} updatePassengers={updatePassengers}/>
      <ErrorBoundry>
        <ResultsList {...props}/>
      </ErrorBoundry>
    </div>
  );
}

const mapStateToProps = state => ({
  departures: state.departures,
  locations: state.locations,
});

const mapDispatchToProps = dispatch => {
  return {
    fetchData: (params) => dispatch(fetchData(params)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
