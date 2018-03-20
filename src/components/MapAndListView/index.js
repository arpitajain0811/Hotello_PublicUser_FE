import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { storeAllHotels, storeFilteredHotels } from '../../redux/actions';
import ReactGoogleMaps from '../ReactGoogleMaps';
import HotelCardsContainer from '../HotelCardsContainer';
import HotelBoxContainer from '../HotelBoxContainer';
import './MapAndListView.css';
import constants from '../../constants.json';
import Slider from 'react-slider';
import Loader from '../Loader';
import SliderPrice from '../SliderPrice';

class MapAndListView extends React.Component {
  render() {
    if (this.props.loaded === false) {
      return (
        <Loader />
      );
    }
    return (
      <div className="map-and-list-view-page">
        <div className="mapAndListView" >

          {/* <HotelCardsContainer filteredHotels={this.props.filteredHotels} /> */}
          <HotelBoxContainer filteredHotels={this.props.filteredHotels} selectedHotelDetails={this.props.selectedHotelDetails} displayCard={this.props.displayCard} />
          <div className="map-container">
            <ReactGoogleMaps
              centr={this.props.center}
              isMarkerShown
              allHotels={this.props.filteredHotels}
            // updateFilteredHotels={this.updateFilteredHotels}
              updateCenter={this.props.updateCenter}
              displayCard={this.props.displayCard}
            />
          </div>
        </div>
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => ({
  saveAllHotels: (allHotelsArray) => {
    dispatch(storeAllHotels(allHotelsArray));
  },
  saveFilteredHotels: (filteredHotelsArray) => {
    dispatch(storeFilteredHotels(filteredHotelsArray));
  },
});
const mapStateToProps = state => ({
  allHotels: state.storeHotels.allHotels,
  filteredHotels: state.storeHotels.filteredHotels,
  city: state.searchOptions.city,
});

export default connect(mapStateToProps, mapDispatchToProps)(MapAndListView);

MapAndListView.defaultProps = {
  allHotels: [],
  filteredHotels: [],
  loaded: false,
};
MapAndListView.propTypes = {
  saveFilteredHotels: PropTypes.func.isRequired,
  allHotels: PropTypes.arrayOf(Object),
  filteredHotels: PropTypes.arrayOf(Object),
  loaded: PropTypes.bool,
  center: PropTypes.object.isRequired,
  city: PropTypes.string.isRequired,
};
