import React from 'react';
import './MapAndListView.css';

class MapAndListView extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="mapAndListView" >
        <div className="hotelList" >
          hotelList
        </div>
        <div className="map" >
          map
        </div>
      </div>
    );
  }
}

export default MapAndListView;

