import React from 'react';
import PropTypes from 'prop-types';
import HotelCard from '../HotelCard';
import './HotelCardsContainer.css';

class HotelCardsContainer extends React.Component {
  render() {
    const filteredHotelsCards = [];
    this.props.filteredHotels.forEach((hotel) => {
      filteredHotelsCards.push(<HotelCard
        key={hotel.hotel_id}
        hotelId={hotel.hotel_id}
        hotelName={hotel.hotel_name}
        stars={hotel.stars}
        minRate={parseFloat(hotel.min_rate.amount.toFixed(2))}
        image={hotel.thumbnail}
      />);
    });
    return (
      <div className="hotel-cards-container">
        {filteredHotelsCards.length === 0 ? 'No hotels in this area.' : filteredHotelsCards}
      </div>);
  }
}
HotelCardsContainer.defaultProps = {
  filteredHotels: [],
};
HotelCardsContainer.propTypes = {
  filteredHotels: PropTypes.arrayOf(Object),
};
export default HotelCardsContainer;
