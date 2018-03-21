import React from 'react';
import AnimateOnChange from 'react-animate-on-change';
import './Loader.css';

class Loader extends React.Component {
  render() {
    return (
      <AnimateOnChange
        baseClassName="loader"
        animationClassName="loader-anim"
        animate
      >

        <div>
          <img src="/lava.svg" alt="loader" className="loader-img" />
          <img src="/h-logo.png" alt="hlogo" className="h-logo" />
        </div>
        <p className="loader-text">Searching for hotels</p>

      </AnimateOnChange>
    );
  }
}
Loader.defaultProps = {
};
Loader.propTypes = {
};
export default Loader;
