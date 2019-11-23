import React from 'react';
import SearchPanel from '../components/SearchPanel';
import ResultsContainer from '../components/ResultsContainer';
import ErrorBoundry from './ErrorBoundry'
import styles from './App.module.css';

function App() {
  return (
    <div className={styles.App}>
      <SearchPanel />
      <ErrorBoundry>
        <ResultsContainer />
      </ErrorBoundry>
    </div>
  );
}

export default App;
