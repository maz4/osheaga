import React from 'react';
import { connect } from 'react-redux';

const ErrorBoundry = (props) => {
  if(props.error){
    return (
      <div>
        <h3>Ups something went wrong please refresh the page</h3>
        <p>{props.errorData.message}</p>
      </div>
    )
  }

  return props.children;
}

const mapStateToProps = state => {
  return {
    error: state.error,
    errorData: state.errorData
  }
}

export default connect(mapStateToProps)(ErrorBoundry);