import React from 'react';
import { compose, withProps, withState, withHandlers } from 'recompose';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  Circle,
} from 'react-google-maps';
import constants from '../../constants.json';

const latLngArr = [
  {
    lng: 72.871440,
    lat: 19.111620,
  },
  {
    lng: 72.836379,
    lat: 19.067639,
  },
  {
    lng: 72.898700,
    lat: 19.134700,
  },
  {
    lat: 18.927713,
    lng: 72.820626,
  },
];

const rows = [];
rows.push(<Marker position={latLngArr[0]} />);
rows.push(<Marker position={latLngArr[1]} />);
rows.push(<Marker position={latLngArr[2]} />);
rows.push(<Marker position={latLngArr[3]} />);

const MyMapComponent = compose(
  withProps({
    googleMapURL:
    `https://maps.googleapis.com/maps/api/js?key=${constants.API_KEY}&v=3.exp&libraries=geometry,drawing,places`,
    loadingElement: <div style={{ height: '100%' }} />,
    containerElement: <div style={{ height: '600px' }} />,
    mapElement: <div style={{ height: '100%' }} />,
  }),
  withState('radius', 'changeRadius', 2000),
  withState('center', 'onCenterChange', { lat: 19.0760, lng: 72.8777 }),
  withState('zoom', 'onZoomChange', 14),
  withHandlers(() => {
    const refs = {
      map: undefined,
    };

    return {
      onMapMounted: () => (ref) => {
        refs.map = ref;
      },
      onCenterChanged: ({ onCenterChange }) => () => {
        onCenterChange(refs.map.getCenter());
      },
      onZoomChanged: ({ onZoomChange, changeRadius }) => () => {
        onZoomChange(refs.map.getZoom());
        const zoom = (refs.map.getZoom());
        // alert(zoom);
        let offset = 0;
        if (zoom > 0 && zoom < 15) {
          offset = 15;
        } else if (zoom >= 15 && zoom < 17) {
          offset = 17;
        } else if (zoom >= 17 && zoom < 20) {
          offset = 20;
        }
        // const x = offset-zoom;
        //   const radius = 5*(x−1)*(x-1)-5

        changeRadius((offset - zoom) * (1 / zoom) * (10000));
      },
    };
  }),
  withScriptjs,
  withGoogleMap,
)(props => (
  <GoogleMap
    defaultZoom={14}
    ref={props.onMapMounted}
    defaultCenter={props.center}
    onCenterChanged={props.onCenterChanged}
    onZoomChanged={props.onZoomChanged}
  >
    <Circle
      center={props.center}
      radius={props.radius}
    />
    {props.isMarkerShown && <Marker position={props.center} />}
    {rows}
  </GoogleMap>
));

export default MyMapComponent;
