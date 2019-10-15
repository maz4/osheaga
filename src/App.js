import React from 'react';
import SearchPanel from './containers/SearchPanel';
import ResultsContainer from './components/ResultsContainer';

function App(props) {
  return (
    <div className="App">
      <SearchPanel />
      <ResultsContainer />
    </div>
  );
}

export default App;
