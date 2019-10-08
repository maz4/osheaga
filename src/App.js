import React, {useState} from 'react';

function SearchForm(){

  const [departure, setDeparture] = useState('');
  const [destination, setDestination] = useState('');
  const [date, setDate]=useState('');

  function departurenHandler(event){
    setDeparture(event.target.value);
  }

  function destinationHandler(event){
    setDestination(event.target.value);
  }

  function dateHandler(event){
    setDate(event.target.value);
  }
  return(
    <form>
      <label for="departure">Departure</label>
      <input type="text" id="departure" value={departure} onChange={departurenHandler} />

      <label for="destination">Destination</label>
      <input type="text" id="destination" value={destination} onChange={destinationHandler} />

      <label for="date">Date</label>
      <input type="date" id="date" value={date} onChange={dateHandler}/>

      <label for="return">Return</label>
      <input type="checkbox" id="return" />
      <button>Search</button>
    </form>
  );
}

function App() {
  return (
    <div className="App">
      <SearchForm />
    </div>
  );
}

export default App;
