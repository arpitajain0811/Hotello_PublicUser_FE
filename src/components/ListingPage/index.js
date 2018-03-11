import React from 'react';
import './ListingPage.css';
import SarchBarAndHeader from '../SearchBarAndHeader';
import HotelParameterBox from '../HotelParameterBox';
import MapAndListView from '../MapAndListView';

class ListingPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="listingPage" >
        <SarchBarAndHeader />
        <HotelParameterBox />
        <MapAndListView />
      </div>

    );
  }
}

export default ListingPage;

