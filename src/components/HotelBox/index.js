import React from 'react';
import PropTypes from 'prop-types';
import './HotelBox.css';

class HotelBox extends React.Component {
  render() {
    const stars = [];
    for (let i = 0; i < Number(this.props.stars); i += 1) {
      stars.push((<img
        src="/star.svg"
        className="star"
        alt="star"
        key={i}
      />));
    }
    for (let i = 0; i < (5 - Number(this.props.stars)); i += 1) {
      stars.push((<img
        src="/star-grey.svg"
        className="star-grey"
        alt="star-grey"
        key={Number(this.props.stars) + i}
      />));
    }
    return (
      <div
        className="hotel-box"
        style={(this.props.image === '') ? { backgroundImage: `url("/placeholder-hotel-image${((this.props.hotelId % 6) + 1).toString()}.jpeg")` } : { backgroundImage: `url(${this.props.image})` }}
        onClick={this.props.onClickHandler}
      >
        <div className="hotel-box-content">
          <div className="hotel-box-name">{this.props.hotelName}</div>
          <div className="hotel-box-details">
            <p className="hotel-box-min-rate"> ₹{(Number(this.props.minRate) * 65).toFixed(2)}</p>
            <p className="hotel-box-stars">{stars}</p>
          </div>
        </div>
      </div>
    );
  }
}
HotelBox.defaultProps = {
  hotelName: 'Hotel Name',
  image: '',
  minRate: 0,
  stars: '0',
};
HotelBox.propTypes = {
  hotelName: PropTypes.string,
  image: PropTypes.string,
  minRate: PropTypes.number,
  stars: PropTypes.string,
};
export default HotelBox;
