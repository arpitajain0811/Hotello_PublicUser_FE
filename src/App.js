import React, { Component } from 'react';
import './App.css';
// import LandingPageBody from '../src/components/LandingPageBody';
// import RoomsDropdownField from './components/RoomsDropdownField';

import ListingPage from './components/ListingPage';
// import MyMapComponent from '../src/components/ReactGoogleMaps';

// { /* <div className="App" >
//         <LandingPageBody />
//         <ListingPage />
//       </div> */ }

class App extends Component {
  render() {
    return (
      <ListingPage />
    );
  }
}

export default App;
