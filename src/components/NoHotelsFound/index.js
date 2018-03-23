import React from 'react';
import './NoHotelsFound.css';

class NoHotelsFound extends React.Component {
  render() {
    return (
      <div className="no-hotels-found">
        <img className="no-hotels-img" src="/door-hang-sign.svg" alt="no-hotels-found" />
      Sorry! No Hotels Found In This Price Range
      </div>);
  }
}
NoHotelsFound.defaultProps = {
};
NoHotelsFound.propTypes = {
};
export default NoHotelsFound;
