import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
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


      <div className="HotelCard-outer">
        <div
          className="hotel-image"
          style={{ backgroundImage: `url("/placeholder-hotel-image${((this.props.image% 6) + 1).toString()}.jpeg")`}}
        />
        <div className="hotel-card-content">
          <div className="hotel-card-name" title={this.props.hotelName}>{(this.props.hotelName.length > 14) ? (`${this.props.hotelName.slice(0, 11)}...`) : this.props.hotelName}</div>
          <div className="hotel-card-details">
            <p className="hotel-card-stars">{stars}</p>
            <p className="hotel-card-min-rate"> ₹ {(Number(this.props.minRate) * 65).toFixed(2)}</p>
            <Link to={`/detailsPage/${this.props.hotelId}`} className="Details-Link">
              <button className="HotelCard-btn">Book</button>
            </Link>
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
  hotelId: PropTypes.number.isRequired,
};
export default HotelCard;
