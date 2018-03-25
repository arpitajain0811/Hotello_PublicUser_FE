import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { storeAllHotels, storeFilteredHotels } from '../../redux/actions';
import ReactGoogleMaps from '../ReactGoogleMaps';
import HotelBoxContainer from '../HotelBoxContainer';
import './MapAndListView.css';
import Loader from '../Loader';
import NoCityEntered from '../NoCityEntered';

class MapAndListView extends React.Component {
  render() {
    if (this.props.loaded === false) {
      return (
        <Loader />
      );
    }
    else if(this.props.noCity===true){
      return (
        <div className="map-and-list-view-page">
        <NoCityEntered/>
        </div>
      )

    }
    return (
      <div className="map-and-list-view-page">
        <div className="mapAndListView" >

          {/* <HotelCardsContainer filteredHotels={this.props.filteredHotels} /> */}
          <HotelBoxContainer
            filteredHotels={this.props.filteredHotels}
            selectedHotelDetails={this.props.selectedHotelDetails}
            displayCard={this.props.displayCard}
          />
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
  filteredHotels: [],
  loaded: false,
};
MapAndListView.propTypes = {
  filteredHotels: PropTypes.arrayOf(Object),
  loaded: PropTypes.bool,
  center: PropTypes.object.isRequired,
  selectedHotelDetails: PropTypes.func.isRequired,
  displayCard: PropTypes.func.isRequired,
  updateCenter: PropTypes.func.isRequired,
};
