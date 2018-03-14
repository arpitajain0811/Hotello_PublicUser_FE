import React from 'react';
import { compose, withProps, withState, withHandlers } from 'recompose';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Circle,
  OverlayView,
} from 'react-google-maps';
import './ReactGoogleMaps.css';
import constants from '../../constants.json';

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
  withState('radius', 'changeRadius', 715),
  // withState('centr', 'onCenterChange'),
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
      onCenterChanged: ({ changeRadius }) => () => {
        const newCenter = refs.map.getCenter();
        const newCenterObj = { lat: newCenter.lat(), lng: newCenter.lng() };
        // onCenterChange(newCenterObj);
        props.updateCenter(newCenterObj);
        console.log('inhandler:::', props.radius);
        const zoom = (refs.map.getZoom());
        let offset = 0;
        if (zoom > 0 && zoom < 15) {
          offset = 15;
        } else if (zoom >= 15 && zoom < 17) {
          offset = 17;
        } else if (zoom >= 17 && zoom < 20) {
          offset = 20;
        }

        const newRadius = (offset - zoom) * (1 / zoom) * (10000);
        changeRadius(newRadius);
        props.updateFilteredHotels(newCenterObj, newRadius);
      },
      onZoomChanged: ({ onZoomChange, changeRadius }) => () => {
        onZoomChange(refs.map.getZoom());
        const zoom = (refs.map.getZoom());
        let offset = 0;
        if (zoom > 0 && zoom < 15) {
          offset = 15;
        } else if (zoom >= 15 && zoom < 17) {
          offset = 17;
        } else if (zoom >= 17 && zoom < 20) {
          offset = 20;
        }
        console.log('soomh', props.zoom);
        const newRadius = (offset - zoom) * (1 / zoom) * (10000);
        console.log('2222inhandler:::', newRadius);
        changeRadius(newRadius);
        props.updateFilteredHotels(props.center, newRadius);
      },
      showCard: ({ onMouseOver, changeHid }) => (hotelId) => {
        onMouseOver(true);
        changeHid(hotelId);
      },
      hideCard: ({ onMouseOver }) => () => {
        onMouseOver(false);
      },
    };
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
        onFocus={() => { props.showCard(); }}
      >
        <div className="OverlayView-main">
          <div
className="OverlayView-hover-trigger"
            onMouseOver={() => { props.showCard(hotel.hotel_id); }}
            onMouseOut={() => { props.hideCard(hotel.hotel_id); }}
          >
            <div
              className="OverlayView-content"
              onFocus={() => { props.showCard(); }}
              onBlur={() => { props.hideCard(); }}
            >
              <div
                className={hotel.stars <= 2 ? 'OverlayView-stars-red' : (((hotel.stars > 2) && (hotel.stars < 4)) ? 'OverlayView-stars-orange' : 'OverlayView-stars-green')}
                onMouseOver={() => { props.showCard(hotel.hotel_id); }}
                onFocus={() => { props.showCard(); }}
              >
                {hotel.stars} &#9733;
              </div>
              <div
                className="OverlayView-price"
                onMouseOver={() => { props.showCard(hotel.hotel_id); }}
                onFocus={() => { props.showCard(); }}
              >
              &#8377; {Math.round(Number(hotel.min_rate.amount * 65) * 100) / 100}
              </div>
            </div>
          </div>
          <div
            className={(props.cardShown && hotel.hotel_id === props.hid) ? 'OverlayView-CardShow' : 'OverlayView-CardHide'}
          >
            {hotel.hotel_name}
          </div>
        </div>
      </OverlayView>
    );
    hotelOverlays.push(hotelOverlay);
  });

  return (
    <GoogleMap
      defaultZoom={props.zoom}
      ref={props.onMapMounted}
      center={props.centr}
      onDragEnd={props.onCenterChanged}
      onZoomChanged={props.onZoomChanged}
    >
      <Circle
        center={props.centr}
        radius={props.radius}
      />
      {hotelOverlays}

    </GoogleMap>
  );
});

export default MyMapComponent;
