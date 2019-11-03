import React from 'react';
import SearchPanel from '../components/SearchPanel';
import ResultsContainer from '../components/ResultsContainer';
import ErrorBoundry from './ErrorBoundry'

function App() {
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
