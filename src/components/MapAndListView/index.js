import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { storeAllHotels, storeFilteredHotels } from '../../redux/actions';
import ReactGoogleMaps from '../ReactGoogleMaps';
import HotelCardsContainer from '../HotelCardsContainer';
import HotelBoxContainer from '../HotelBoxContainer';
import filterByPrice from '../../helpers/filterByPrice';
import './MapAndListView.css';
import constants from '../../constants.json';
import Slider from 'react-slider';
import Loader from '../Loader';

class MapAndListView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      center: {},
      ctr: 0,
      selectedHotelDetails: {},
    };
  }

  updateFilteredHotels = (priceRange) => {
    // console.log('received', radius);
    const newFilteredHotels = filterByPrice(this.props.allHotels, priceRange);
    this.props.saveFilteredHotels(newFilteredHotels);
  }

  displayCard=(hotelId, origin) => {
    console.log('display');
    fetch(
      `/viewHotelDetails/${hotelId}`,
      {
        headers:
      { authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1MjA0MTY2NjUsImVtYWlsIjoiYWRtaW5AaG90ZWxsby5jb20iLCJpYXQiOjE1MjA0MTMwNjV9.7r28DUo3Mycw9dEwkZ7UB0sx6aJC1wizKyPpgVoD-eM' },
        sessionId: window.localStorage.getItem('cookie'),
      },
    ).then(response => response.json()).then((respJSON) => {
      this.setState({
        selectedHotelDetails: {
          id: hotelId, desc: respJSON.hotel_details.description, name: respJSON.hotel_details.hotel_name, origin,
        },
      });
    });
  }

  render() {
    if (this.props.loaded === false) {
      return (
        <Loader />
      );
    }
    return (
      <div className="">
        <Slider
          defaultValue={[25, 75]}
          withBars
          onAfterChange={(v) => {
              this.updateFilteredHotels(v);
        }}
        />
        <div className="mapAndListView" >

          {/* <HotelCardsContainer filteredHotels={this.props.filteredHotels} /> */}
          <HotelBoxContainer filteredHotels={this.props.filteredHotels} selectedHotelDetails={this.state.selectedHotelDetails} displayCard={this.displayCard} />
          <div className="map-container">
            <ReactGoogleMaps
              centr={this.props.center}
              isMarkerShown
              allHotels={this.props.filteredHotels}
            // updateFilteredHotels={this.updateFilteredHotels}
              updateCenter={this.props.updateCenter}
              displayCard={this.displayCard}
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
