import React from 'react';
import PropTypes from 'prop-types';
import './SliderPrice.css';

class SliderPrice extends React.Component {
  render() {
    return (
      <div className="slider-price">
        {this.props.price}
      </div>);
  }
}
SliderPrice.defaultProps = {
};
SliderPrice.propTypes = {
};
export default SliderPrice;
