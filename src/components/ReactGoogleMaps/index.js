import React from 'react';
import { compose, withProps, withState, withHandlers, lifecycle } from 'recompose';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  OverlayView,
} from 'react-google-maps';
import './ReactGoogleMaps.css';
import constants from '../../constants.json';
import HotelCard from '../HotelCard';

// const getPixelPositionOffset = (width, height) => ({
//   x: -(width / 2),
//   y: -(height / 2),
// });

const MyMapComponent = compose(
  withProps(props => ({
    parentProps: props,
    googleMapURL:
    `https://maps.googleapis.com/maps/api/js?key=${constants.API_KEY}&v=3.exp&libraries=geometry,drawing,places`,
    loadingElement: <div style={{ height: '100%' }} />,
    containerElement: <div style={{ height: '600px' }} />,
    mapElement: <div style={{ height: '100%' }} />,
  })),

  withState('zoom', 'onZoomChange', 14),
  withState('cardShown', 'onMouseOver', false),
  withState('hid', 'changeHid', 0),
  withHandlers((props) => {
    const refs = {
      map: undefined,
    };
    return {
      onMapMounted: () => (ref) => {
        refs.map = ref;
      },

      onCenterChanged: () => () => {
        const newCenter = refs.map.getCenter();
        const newCenterObj = { lat: newCenter.lat(), lng: newCenter.lng() };
        props.updateCenter(newCenterObj);
      },
      showCard: ({ onMouseOver, changeHid }) => (hotelId) => {
        onMouseOver(true);
        changeHid(hotelId);
      },
      hideCard: ({ onMouseOver, changeHid }) => () => {
        onMouseOver(false);
        changeHid('');
      },
    };
  }),
  lifecycle({
    shouldComponentUpdate(nextProps) {
      if (
        (nextProps.allHotels.length === this.props.allHotels.length) &&
        (nextProps.hid === this.props.hid)
      ) {
        return false;
      }
      return true;
    },
  }),
  withScriptjs,
  withGoogleMap,
)((props) => {
  // const hotelMarkers = [];
  // props.allHotels.forEach((hotel) => {
  //   const hotelMarker = (<Marker
  //     key={hotel.hotel_id}
  //     position={{ lat: Number(hotel.latitude), lng: Number(hotel.longitude) }}
  //   />);
  //   hotelMarkers.push(hotelMarker);
  const hotelOverlays = [];
  console.log('inrender:', props.radius, props.centr);
  // const someHotels = props.allHotels.slice(0, 30);
  const someHotels = props.allHotels;
  someHotels.forEach((hotel) => {
    const hotelOverlay = (
      <OverlayView
        className="Maps-OverlayView"
        key={hotel.hotel_id}
        position={{ lat: Number(hotel.latitude), lng: Number(hotel.longitude) }}
        mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
        onMouseOver={() => { props.showCard(hotel.hotel_id); }}
        onMouseOut={() => { props.hideCard(hotel.hotel_id); }}
        onFocus={() => { props.showCard(hotel.hotel_id); }}
        onBlur={() => { props.hideCard(hotel.hotel_id); }}

      >
        <div
          className="OverlayView-main"
          onMouseOver={() => { props.showCard(hotel.hotel_id); }}
          onMouseOut={() => { props.hideCard(hotel.hotel_id); }}
          onFocus={() => { props.showCard(hotel.hotel_id); }}
          onBlur={() => { props.hideCard(hotel.hotel_id); }}
        >
          <div
            className="OverlayView-hover-trigger"
            onMouseOver={() => { props.showCard(hotel.hotel_id); }}
            onFocus={() => { props.showCard(hotel.hotel_id); }}
            onClick={() => { props.displayCard(hotel.hotel_id); }}
          >
            <div
              className="OverlayView-content"
              onMouseOver={() => { props.showCard(hotel.hotel_id); }}
              onFocus={() => { props.showCard(hotel.hotel_id); }}
            >
              <div
                className={hotel.stars <= 2 ? 'OverlayView-stars-red' : (((hotel.stars > 2) && (hotel.stars < 4)) ? 'OverlayView-stars-orange' : 'OverlayView-stars-green')}
              >
                {hotel.stars} &#9733;
              </div>
              <div
                className="OverlayView-price"
              >
              &#8377; {Math.round(Number(hotel.min_rate.amount * 65) * 100) / 100}
              </div>
            </div>
          </div>
          <div
            className={(props.cardShown && hotel.hotel_id === props.hid) ? 'OverlayView-CardShow' : 'OverlayView-CardHide'}
          >
            <HotelCard
              hotelId={hotel.hotel_id}
              hotelName={hotel.hotel_name}
              image=""
              minRate={hotel.min_rate.amount}
              stars={hotel.stars}
            />
          </div>
        </div>
      </OverlayView>
    );
    hotelOverlays.push(hotelOverlay);
  });

  return (

    <GoogleMap
      defaultZoom={14}
      ref={props.onMapMounted}
      center={props.centr}
      onDragEnd={props.onCenterChanged}
      onZoomChanged={props.onZoomChanged}
    >
      {hotelOverlays}

    </GoogleMap>
  );
});

export default MyMapComponent;
