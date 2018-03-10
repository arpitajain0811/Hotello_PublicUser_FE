import React, { Component } from 'react';
import './App.css';
import MyMapComponent from './ReactGoogleMaps';

class App extends Component {
  render() {
    return (
      <MyMapComponent isMarkerShown />
    );
  }
}

export default App;
