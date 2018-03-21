import React from 'react';
import PropTypes from 'prop-types';
import HotelBox from '../HotelBox';
import './HotelBoxContainer.css';
import InfoCard from '../InfoCard';
import NoHotelsFound from '../NoHotelsFound';

class HotelBoxContainer extends React.Component {
  render() {
    const filteredHotelsBox = [];
    let searchIndex = -1;
    this.props.filteredHotels.forEach((hotel, index) => {
      if (hotel.hotel_id === this.props.selectedHotelDetails.id) {
        searchIndex = index;
      }
      filteredHotelsBox.push(<HotelBox
        key={hotel.hotel_id}
        hotelId={hotel.hotel_id}
        hotelName={hotel.hotel_name}
        stars={hotel.stars}
        minRate={parseFloat(hotel.min_rate.amount.toFixed(2))}
        image={hotel.thumbnail}
        onClickHandler={() => { this.props.displayCard(hotel.hotel_id, hotel.hotel_name, hotel.stars, 'box'); }}
      />);
    });
    if (searchIndex > -1) {
      const infoCard = (<InfoCard
        name={this.props.selectedHotelDetails.name}
        nearby={this.props.selectedHotelDetails.nearby}
        stars={this.props.selectedHotelDetails.stars}
      />);
      if (this.props.selectedHotelDetails.origin === 'map') {
        filteredHotelsBox.splice(0, 0, infoCard);
      } else if (searchIndex % 2 === 0) {
        filteredHotelsBox.splice(searchIndex + 2, 0, infoCard);
      } else {
        filteredHotelsBox.splice(searchIndex + 1, 0, infoCard);
      }
    }
    return (
      <div>
        <div className="hotel-box-container">
          {filteredHotelsBox.length === 0 ? <NoHotelsFound /> : filteredHotelsBox}
        </div>
      </div>);
  }
}
HotelBoxContainer.defaultProps = {
  filteredHotels: [],
};
HotelBoxContainer.propTypes = {
  filteredHotels: PropTypes.arrayOf(Object),
  selectedHotelDetails: PropTypes.object.isRequired,
  displayCard: PropTypes.func.isRequired,
};
export default HotelBoxContainer;