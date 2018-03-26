import React from 'react';
import './Amenity.css';

const Amenity = (props) => {
  let imgSrc;
  if (props.text === 'Aqua fit') {
    imgSrc = '../../images/icons/pool.svg';
  } else if (props.text === 'Radio') {
    imgSrc = '../../images/icons/radio.svg';
  } else if (props.text.includes('Visa')) {
    imgSrc = '../../images/icons/card.svg';
  } else if (props.text.includes('Caf')) {
    imgSrc = '../../images/icons/cafe.svg';
  } else if (props.text.includes('carte')) {
    imgSrc = '../../images/icons/alacarte.svg';
  } else if ((props.text.includes('Maestro')) || (props.text.includes('JCB Card')) || (props.text.includes('American Expres'))) {
    imgSrc = '../../images/icons/card.svg';
  } else if (props.text === 'Air conditioned') {
    imgSrc = '../../images/icons/ac.svg';
  } else if (props.text.includes('Buffet')) {
    imgSrc = '../../images/icons/buffet.svg';
  } else if (props.text === 'Airport') {
    imgSrc = '../../images/icons/airport.svg';
  } else if ((props.text === ('Hi-fi')) || (props.text === ('Wireless Internet Access')) || (props.text === ('WiFi everywhere'))) {
    imgSrc = '../../images/icons/wifi.svg';
  } else if ((props.text === ('Bathtub or shower')) || (props.text === ('Shared Bathroom'))) {
    imgSrc = '../../images/icons/bathroom.svg';
  } else if (props.text === ('24 Hour Front Desk')) {
    imgSrc = '../../images/icons/frontDesk.svg';
  } else if (props.text === ('Bar / Lounge')) {
    imgSrc = '../../images/icons/bar.svg';
  } else if (props.text === ('Computer station')) {
    imgSrc = '../../images/icons/computer.svg';
  } else if (props.text === ('Meeting Rooms')) {
    imgSrc = '../../images/icons/conference.svg';
  } else if (props.text === ('Meeting Rooms')) {
    imgSrc = '../../images/icons/conference.svg';
  } else {
    imgSrc = '../../images/icons/general.svg';
  }

  return (
    <div className="Amenitycontainer">
      <div className="crop">
        <img src={imgSrc} className="icon" />
      </div>
      <div className="amenityText">
        {props.text}
      </div>
    </div>
  );
};

export default Amenity;
