import React from 'react';
import PropTypes from 'prop-types';
import './HotelCard.css';

class HotelCard extends React.Component {
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
      <div className="hotel-card" style={(this.props.image === '') ? { backgroundImage: 'url("/placeholder-hotel-image'+((this.props.hotelId%6)+1).toString()+'.jpeg")' } : { backgroundImage: `url(${this.props.image})` }}>
        <div className="hotel-card-content">
          <div className="hotel-card-name">{this.props.hotelName}</div>
          <div className="hotel-card-details">
            <p className="hotel-card-min-rate"> ₹{(Number(this.props.minRate) * 65).toFixed(2)}</p>
            <p className="hotel-card-stars">{stars}</p>
          </div>
        </div>
      </div>
    );
  }
}
HotelCard.defaultProps = {
  hotelName: 'Hotel Name',
  image: '',
  minRate: 0,
  stars: '0',
};
HotelCard.propTypes = {
  hotelName: PropTypes.string,
  image: PropTypes.string,
  minRate: PropTypes.number,
  stars: PropTypes.string,
};
export default HotelCard;
