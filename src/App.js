import React, { Component } from 'react';
import './App.css';
import LandingPageBody from '../src/components/LandingPageBody';
// import RoomsDropdownField from './components/RoomsDropdownField';
import LandingPage from '../src/components/LandingPage';

import ListingPage from './components/ListingPage';

class App extends Component {
  render() {
    return (
      <div className="App" >
        <LandingPage />
        {/* <LandingPageBody /> */}
        {/* <ListingPage /> */}
      </div>
    );
  }
}

export default App;
