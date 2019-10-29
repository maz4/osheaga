import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchData } from '../actions/actions';

class SearchPanel extends Component {

  constructor(props) {
    super(props);
    this.newYorkGeohash = 'dr5reg';
    this.montrealGeohash = 'f25dvk';
  }
  
  componentDidMount(){

    const params = `${this.newYorkGeohash}/${this.montrealGeohash}/${this.props.date}?adults=${this.props.passangers.adults}&children=${this.props.passangers.children}&seniors=${this.props.passangers.seniors}&index=${this.props.departures.length}`;
    if(!this.props.complete){
      this.props.fetchData(params);
    }

  }

  departurenHandler(event){
    // this.setState({departure: event.target.value})
  }

  destinationHandler(event){
    // this.setState({destination: event.target.value})
  }

  dateHandler(event){
    // this.setState({date: event.target.value})
  }

  adultsHandler(event) {
    // this.setState({adults: event.target.value})
  }

  chidlrenHandler(event){
    // this.setState({children: event.target.value})
  }

  seniorHandler(event){
    // this.setState({seniors: event.target.value})
  }

  submitHandler(event){
    event.preventDefault();
  }

  render(){
    return(
      <form url="" >
        <label htmlFor="departure">Departure</label>
        <input type="text" id="departure" value={this.props.departureCity} onChange={this.departurenHandler} />
  
        <label htmlFor="destination">Destination</label>
        <input type="text" id="destination" value={this.props.destinationCity} onChange={this.destinationHandler} />
  
        <label htmlFor="date">Date</label>
        <input type="date" id="date" value={this.props.date} onChange={this.dateHandler}/>
  
        <label htmlFor="return">Return</label>
        <input type="checkbox" id="return" />
  
        <div>
          <p>Passangers</p>
          
          <label htmlFor="adults">Adults</label>
          <input type="number" id="adults" value={this.props.passangers.adults} onChange={this.adultsHandler}  />
  
          <label htmlFor="children">Children</label>
          <input type="number" id="children" value={this.props.passangers.children} onChange={this.chidlrenHandler} />
  
          <label htmlFor="seniors">Senior</label>
          <input type="number" id="seniot" value={this.props.passangers.seniors} onChange={this.seniorHandler} />
        </div>
        <button onClick={this.submitHandler}>Search</button>
      </form>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchData: (params) => dispatch(fetchData(params)),
  };
};

const mapStateToProps = state => {
  return {
    complete: state.complete,
    departures: state.departures,
    passangers: state.passangers,
    departureCity: state.departureCity,
    destinationCity: state.destinationCity,
    date: state.date
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchPanel);