import React from 'react';
import { compose, withProps, withState, withHandlers } from 'recompose';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  Circle,
  OverlayView,
} from 'react-google-maps';
import './ReactGoogleMaps.css';

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
  // withState('zoom', 'onZoomChange', 14),

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
      >
        <div>
          <div className="OverlayView-content">
            <div
              className={hotel.stars <= 2 ? 'OverlayView-stars-red' : (((hotel.stars > 2) && (hotel.stars < 4)) ? 'OverlayView-stars-orange' : 'OverlayView-stars-green')}
            >
              {hotel.stars} &#9733;
            </div>
            <div className="OverlayView-price">
             &#8377; {Math.round(Number(hotel.min_rate.amount * 65) * 100) / 100}
            </div>
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
      <Circle
        center={props.centr}
        radius={props.radius}
      />
      {props.isMarkerShown && <Marker position={props.centr} />}
      {hotelOverlays}

    </GoogleMap>
  );
});

export default MyMapComponent;
