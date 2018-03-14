import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { storeAllHotels, storeFilteredHotels } from '../../redux/actions';
import ReactGoogleMaps from '../ReactGoogleMaps';
import HotelCardsContainer from '../HotelCardsContainer';
import filterHotels from '../../helpers/filterHotels';
import './MapAndListView.css';
import constants from '../../constants.json';
import Loader from '../Loader';

class MapAndListView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      center: {},
      ctr: 0,
    };
  }

  updateFilteredHotels = (center, radius) => {
    console.log('received', radius);
    const newFilteredHotels = filterHotels(center, radius, this.props.allHotels);
    this.props.saveFilteredHotels(newFilteredHotels);
  }

  render() {
    if (this.props.loaded === false) {
      return (
        <Loader />
      );
    }
    return (
      <div className="mapAndListView" >
        <HotelCardsContainer filteredHotels={this.props.filteredHotels} />

        <div className="map-container">
          <ReactGoogleMaps
            centr={this.props.center}
            isMarkerShown
            allHotels={this.props.allHotels}
            updateFilteredHotels={this.updateFilteredHotels}
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
