import React from 'react';
import PropTypes from 'prop-types';
import HotelCard from '../HotelCard';
import './HotelCardsContainer.css';

class HotelCardsContainer extends React.Component {
  render() {
    return (
      <div className="hotel-cards-container">
        <HotelCard hotelName="VITS Mumbai" stars="4" minRate={280} image="" />
        <HotelCard hotelName="VITS Mumbai" stars="4" minRate={280} image="" />
      </div>);
  }
}
HotelCardsContainer.defaultProps = {
};
HotelCardsContainer.propTypes = {
};
export default HotelCardsContainer;
