import React from 'react';
import './Amenity.css';

const Amenity = (props) => {
  let imgSrc;
  if ((props.text === 'Aqua fit') || (props.text.toLowerCase().includes('pool'))) {
    imgSrc = '../../images/icons/pool.svg';
  } else if (props.text.toLowerCase().includes('radio')) {
    imgSrc = '../../images/icons/radio.svg';
  } else if (props.text.includes('Visa')) {
    imgSrc = '../../images/icons/card.svg';
  } else if (props.text.includes('Caf') || props.text.toLowerCase().includes('tea') || props.text.toLowerCase().includes('coffee')) {
    imgSrc = '../../images/icons/cafe.svg';
  } else if (props.text.includes('carte')) {
    imgSrc = '../../images/icons/alacarte.svg';
  } else if ((props.text.includes('Maestro')) || (props.text.includes('JCB Card')) || (props.text.includes('American Expres')) || (props.text.includes('card'))) {
    imgSrc = '../../images/icons/card.svg';
  } else if ((props.text.toLowerCase().includes('air condition')) || (props.text.toLowerCase().includes(' ac '))) {
    imgSrc = '../../images/icons/ac.svg';
  } else if (props.text.includes('Buffet') || props.text.toLowerCase().includes('breakfast') || props.text.toLowerCase().includes('restaurant')) {
    imgSrc = '../../images/icons/buffet.svg';
  } else if (props.text.toLowerCase().includes('airport')) {
    imgSrc = '../../images/icons/airport.svg';
  } else if ((props.text === ('Hi-fi')) || (props.text === ('Wireless Internet Access')) || (props.text === ('WiFi everywhere')) || (props.text.toLowerCase().includes('wireless')) || (props.text.toLowerCase().includes('internet'))) {
    imgSrc = '../../images/icons/wifi.svg';
  } else if ((props.text === ('Bathtub or shower')) || (props.text === ('Shared Bathroom')) || props.text.toLowerCase().includes('bathroom')) {
    imgSrc = '../../images/icons/bathroom.svg';
  } else if (props.text === ('24 Hour Front Desk')) {
    imgSrc = '../../images/icons/frontDesk.svg';
  } else if (props.text.toLowerCase().includes('bar') || props.text.toLowerCase().includes('lounge')) {
    imgSrc = '../../images/icons/bar.svg';
  } else if (props.text.toLowerCase().includes('computer')) {
    imgSrc = '../../images/icons/computer.svg';
  } else if ((props.text === ('Meeting Rooms')) || (props.text.toLowerCase().includes('conference'))) {
    imgSrc = '../../images/icons/conference.svg';
  } else if (props.text.toLowerCase().includes('tv') || props.text.toLowerCase().includes('television')) {
    imgSrc = '../../images/icons/tv.svg';
  } else if ((props.text.toLowerCase().includes('room') && (!props.text.toLowerCase().includes('bathroom'))) || props.text.toLowerCase().includes('bed')) {
    imgSrc = '../../images/icons/bed.svg';
  } else if (props.text.toLowerCase().includes('parking')) {
    imgSrc = '../../images/icons/parking.svg';
  } else if (props.text.toLowerCase().includes('elevator') || props.text.toLowerCase().includes('lift')) {
    imgSrc = '../../images/icons/lift.svg';
  } else if (props.text.toLowerCase().includes('news')) {
    imgSrc = '../../images/icons/newspaper.svg';
  } else if (props.text.toLowerCase().includes('atm')) {
    imgSrc = '../../images/icons/atm.svg';
  } else if (props.text.toLowerCase().includes('gym')) {
    imgSrc = '../../images/icons/gym.svg';
  } else if (props.text.toLowerCase().includes('laundry')) {
    imgSrc = '../../images/icons/laundry.svg';
  } else if (props.text.toLowerCase().includes('iron')) {
    imgSrc = '../../images/icons/iron.svg';
  } else if (props.text.toLowerCase().includes('sauna')) {
    imgSrc = '../../images/icons/sauna.svg';
  } else if (props.text.toLowerCase().includes('wheel chair') || props.text.toLowerCase().includes('disabled')) {
    imgSrc = '../../images/icons/wheelchair.svg';
  } else if (props.text.toLowerCase().includes('toilet')) {
    imgSrc = '../../images/icons/toiletries.svg';
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
