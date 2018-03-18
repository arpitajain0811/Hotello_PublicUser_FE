import React from 'react';
import './TypeAheadSearchBox.css';

const { compose, withProps, lifecycle } = require('recompose');
const { withScriptjs } = require('react-google-maps');
const {
  StandaloneSearchBox,
} = require('react-google-maps/lib/components/places/StandaloneSearchBox');


const getLocationDetails = (obj) => {
  const addressComps = obj.address_components;
  const city = addressComps.filter((comp) => {
    if (comp.types.indexOf('locality') !== -1) {
      return true;
    }
    return false;
  });
  const cityName = city[0].long_name;
  const lat = obj.geometry.location.lat();
  const lng = obj.geometry.location.lng();
  return { cityName, lat, lng };
};

const PlacesWithStandaloneSearchBox = compose(
  withProps({
    googleMapURL:
      'https://maps.googleapis.com/maps/api/js?key=AIzaSyBPTwceVw5ULkKNLRHSjm6aq4LSGvV9uAs&v=3.exp&libraries=geometry,drawing,places',
    loadingElement: <div style={{ height: '100%' }} />,
    containerElement: <div style={{ height: '400px' }} />,
  }),
  lifecycle({
    componentWillMount() {
      const refs = {};

      this.setState({
        places: [],
        onSearchBoxMounted: (ref) => {
          refs.searchBox = ref;
        },
        onPlacesChanged: () => {
          const places = refs.searchBox.getPlaces();
          const { cityName, lat, lng } = getLocationDetails(places[0]);
          this.props.saveSearchCityText(cityName);
          this.props.saveSearchCityLatLng({ lat, lng });
          this.setState({
            places,
          });
        },
      });
    },
  }),
  withScriptjs,
)(props =>
  // console.log(props.places);
  // console.log(props.places[0].geometry.location.lat());
  (
    <div className="typeAheadSearchBox">
      <StandaloneSearchBox
        ref={props.onSearchBoxMounted}
        bounds={props.bounds}
        onPlacesChanged={props.onPlacesChanged}
      >
        <input
          type="text"
          placeholder="search places"
          className="SearchByTextInput"
        />
      </StandaloneSearchBox>
    </div>
  ));

export default PlacesWithStandaloneSearchBox;
