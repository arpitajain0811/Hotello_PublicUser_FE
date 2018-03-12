import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { storeAllHotels, storeFilteredHotels } from '../../redux/actions';
import ReactGoogleMaps from '../ReactGoogleMaps';
import HotelCardsContainer from '../HotelCardsContainer';
import filterHotels from '../../helpers/filterHotels';
import './MapAndListView.css';

class MapAndListView extends React.Component {
  updateFilteredHotels = (center, radius) => {
    console.log('received', radius);
    const newFilteredHotels = filterHotels(center, radius, this.props.allHotels);
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
        <HotelCardsContainer filteredHotels={this.props.filteredHotels} />

        <div className="map-container">
          <ReactGoogleMaps
            isMarkerShown
            allHotels={this.props.allHotels}
            updateFilteredHotels={this.updateFilteredHotels}
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
};
