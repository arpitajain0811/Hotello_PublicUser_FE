import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './MapAndListView.css';

class MapAndListView extends React.Component {
  render() {
    if (this.props.loaded === false) {
      return (
        <p>Loading...</p>
      );
    }
    const h = this.props.allHotels.map(hotel => (<div>{hotel.hotel_name}</div>));
    return (
      <div className="mapAndListView" >
        <div className="hotelList" >
          <div>{h.slice(0, 6)}</div>
        </div>
        <div className="map" >
          map
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  allHotels: state.storeHotels.allHotels,
});

export default connect(mapStateToProps, null)(MapAndListView);

MapAndListView.defaultProps = {
  allHotels: [],
  loaded: false,
};
MapAndListView.propTypes = {
  allHotels: PropTypes.arrayOf(Object),
  loaded: PropTypes.bool,
};
