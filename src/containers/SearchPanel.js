import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { connect } from 'react-redux'
import { saveBusData } from '../actions/actions';

const SearchPanel = (props) => {
  const config = {
    headers: {
      'Accept' : 'application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/',
      'X-Busbud-Token' : 'PARTNER_AHm3M6clSAOoyJg4KyCg7w'
    }
  };
  
  const newYorkGeohash = 'dr5reg';
  const montrealGeohash = 'f25dvk';
  const onboundDate = '2020-08-02';

  const today = new Date();
  const dateString = `${today.getUTCFullYear()}-${today.getUTCMonth() + 1}-${today.getUTCDay()}`;
  const [departure, setDeparture] = useState('');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState(dateString);

  useEffect( () => {
    const url = `https://napi.busbud.com/x-departures/${newYorkGeohash}/${montrealGeohash}/${onboundDate}`;
    axios.get(url, config)
      .then( reposnse => {
        props.saveData(reposnse.data);
      })
      .catch( error => {
        props.setError(error);
      });
  })

  function departurenHandler(event){
    setDeparture(event.target.value);
  }

  function destinationHandler(event){
    setDestination(event.target.value);
  }

  function dateHandler(event){
    setDate(event.target.value);
  }

  function submitHandler(event){
    event.preventDefault();
  }

  return(
    <form>
      <label htmlFor="departure">Departure</label>
      <input type="text" id="departure" value={departure} onChange={departurenHandler} />

      <label htmlFor="destination">Destination</label>
      <input type="text" id="destination" value={destination} onChange={destinationHandler} />

      <label htmlFor="date">Date</label>
      <input type="date" id="date" value={date} onChange={dateHandler}/>

      <label htmlFor="return">Return</label>
      <input type="checkbox" id="return" />
      <button onClick={submitHandler}>Search</button>
    </form>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    saveData: (data) => dispatch(saveBusData(data)),
    setError: (error) => dispatch()
  };
};

export default connect(null, mapDispatchToProps)(SearchPanel);