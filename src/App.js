import React, { Component } from 'react';
import './App.css';
import LandingPageBody from '../src/components/LandingPageBody';
// import RoomsDropdownField from './components/RoomsDropdownField';

class App extends Component {
  render() {
    return (
      <div className="App" >
        <LandingPageBody />
      </div>
    );
  }
}

export default App;
