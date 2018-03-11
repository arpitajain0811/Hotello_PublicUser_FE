import React from 'react';
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
          <div>{h}</div>
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

