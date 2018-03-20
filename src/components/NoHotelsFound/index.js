import React from 'react';
import PropTypes from 'prop-types';
import './NoHotelsFound.css';

class NoHotelsFound extends React.Component {
  render() {
    return (
      <div className="no-hotels-found">
      Sorry! No Hotels Found
      </div>);
  }
}
NoHotelsFound.defaultProps = {
};
NoHotelsFound.propTypes = {
};
export default NoHotelsFound;
