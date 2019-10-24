import React from 'react';
import SearchPanel from './containers/SearchPanel';
import ResultsContainer from './components/ResultsContainer';
import ErrorBoundry from './containers/ErrorBoundry'

function App(props) {
  return (
    <div className="App">
      <SearchPanel />
      <ErrorBoundry>
        <ResultsContainer />
      </ErrorBoundry>
    </div>
  );
}

export default App;
