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
import constants from '../../constants.json';

// const getPixelPositionOffset = (width, height) => ({
//   x: -(width / 2),
//   y: -(height / 2),
// });

const MyMapComponent = compose(
  withProps({
    googleMapURL:
    `https://maps.googleapis.com/maps/api/js?key=${constants.API_KEY}&v=3.exp&libraries=geometry,drawing,places`,
    loadingElement: <div style={{ height: '100%' }} />,
    containerElement: <div style={{ height: '600px' }} />,
    mapElement: <div style={{ height: '100%' }} />,
  }),
  withState('radius', 'changeRadius', 715),
  withState('center', 'onCenterChange', { lat: 19.0760, lng: 72.8777 }),
  withState('zoom', 'onZoomChange', 14),

  withHandlers((props) => {
    const refs = {
      map: undefined,
    };
    return {
      onMapMounted: () => (ref) => {
        refs.map = ref;
      },
      onCenterChanged: ({ onCenterChange, changeRadius }) => () => {
        const newCenter = refs.map.getCenter();
        const newCenterObj = { lat: newCenter.lat(), lng: newCenter.lng() };
        onCenterChange(newCenterObj);
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
        changeRadius(newRadius);
        props.updateFilteredHotels(props.center, newRadius);
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
  console.log('inrender:', props.radius, props.center);
  props.allHotels.forEach((hotel) => {
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
      defaultZoom={props.zoom}
      ref={props.onMapMounted}
      defaultCenter={props.center}
      onDragEnd={props.onCenterChanged}
      onZoomChanged={props.onZoomChanged}
    >
      <Circle
        center={props.center}
        radius={props.radius}
      />
      {props.isMarkerShown && <Marker position={props.center} />}
      {hotelOverlays}

    </GoogleMap>
  );
});

export default MyMapComponent;