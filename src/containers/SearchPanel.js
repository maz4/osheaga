import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import { fetchData } from '../actions/actions';
import querystring from 'querystring'

const SearchPanel = (props) => {
  
  const newYorkGeohash = 'dr5reg';
  const montrealGeohash = 'f25dvk';
  const onboundDate = '2020-08-02';

  const [departure, setDeparture] = useState('New York');
  const [destination, setDestination] = useState('Montréal');
  const [date, setDate] = useState(onboundDate);
  const [adults, setAdults] = useState(2);
  const [children , setChildren] = useState(0);
  const [seniors, setSeniors] = useState(0);

  useEffect( () => {
    const data = {
      adults: adults,
      children: children,
      seniors: seniors,
    }
    const params = `${newYorkGeohash}/${montrealGeohash}/${date}`;
    props.fetchData(params, data)
  }, [])

  function departurenHandler(event){
    setDeparture(event.target.value);
  }

  function destinationHandler(event){
    setDestination(event.target.value);
  }

  function dateHandler(event){
    setDate(event.target.value);
  }

  function adultsHandler(event) {
    setAdults(parseInt(event.target.value));
  }

  function chidlrenHandler(event){
    setChildren(parseInt(event.target.value))
  }

  function seniorHandler(event){
    setSeniors(parseInt(event.target.value));
  }

  function submitHandler(event){
    event.preventDefault();
  }

  return(
    <form url="" >
      <label htmlFor="departure">Departure</label>
      <input type="text" id="departure" value={departure} onChange={departurenHandler} />

      <label htmlFor="destination">Destination</label>
      <input type="text" id="destination" value={destination} onChange={destinationHandler} />

      <label htmlFor="date">Date</label>
      <input type="date" id="date" value={date} onChange={dateHandler}/>

      <label htmlFor="return">Return</label>
      <input type="checkbox" id="return" />

      <div>
        <p>Passangers</p>
        
        <label htmlFor="adults">Adults</label>
        <input type="number" id="adults" value={adults} onChange={adultsHandler}  />

        <label htmlFor="children">Children</label>
        <input type="number" id="children" value={children} onChange={chidlrenHandler} />

        <label htmlFor="seniors">Senior</label>
        <input type="number" id="seniot" value={seniors} onChange={seniorHandler} />
      </div>
      <button onClick={submitHandler}>Search</button>
    </form>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    fetchData: (params) => dispatch(fetchData(params))
  };
};

const mapStateToProps = state => {
  return {
    busData: state.busData
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchPanel);