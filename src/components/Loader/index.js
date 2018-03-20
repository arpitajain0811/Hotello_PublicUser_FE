import React from 'react';
import './Loader.css';

class Loader extends React.Component {
  render() {
    return (
      <div className="loader" >
        <div>
          <img src="/lava.svg" alt="loader" className="loader-img" />
          <img src="/h-logo.png" alt="hlogo" className="h-logo" />
        </div>
        <p className="loader-text">Searching for hotels</p>
      </div>

    );
  }
}
Loader.defaultProps = {
};
Loader.propTypes = {
};
export default Loader;
