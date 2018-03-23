import React from 'react';
import './NoCityEntered.css';

class NoCityEntered extends React.Component {
  render() {
    return (
      <div className="no-city-entered">
        <img className="no-city-img" src="/location-map.svg" alt="no-hotels-found" />
          Search for a city
      </div>);
  }
}
NoCityEntered.defaultProps = {
};
NoCityEntered.propTypes = {
};
export default NoCityEntered;
