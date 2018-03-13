import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { storeAllHotels, storeFilteredHotels } from '../../redux/actions';
import ReactGoogleMaps from '../ReactGoogleMaps';
import HotelCardsContainer from '../HotelCardsContainer';
import filterByPrice from '../../helpers/filterByPrice';
import './MapAndListView.css';
import constants from '../../constants.json';
import Slider from 'react-slider';

class MapAndListView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      center: {},
      ctr: 0,
    };
  }

  updateFilteredHotels = (priceRange) => {
    // console.log('received', radius);
    const newFilteredHotels = filterByPrice(this.props.allHotels, priceRange);
    this.props.saveFilteredHotels(newFilteredHotels);
  }

  render() {
    if (this.props.loaded === false) {
      return (
        <p>Loading...</p>
      );
    }
    return (
      <div className="mapAndListView" >
        <Slider
          defaultValue={[25, 75]}
          withBars
          onAfterChange={(v) => {
              this.updateFilteredHotels(v);
        }}
        />
        <HotelCardsContainer filteredHotels={this.props.filteredHotels} />

        <div className="map-container">
          <ReactGoogleMaps
            centr={this.props.center}
            isMarkerShown
            allHotels={this.props.filteredHotels}
            // updateFilteredHotels={this.updateFilteredHotels}
            updateCenter={this.props.updateCenter}
          />
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
