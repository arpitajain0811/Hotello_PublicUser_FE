import React from 'react';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import './HotelParameterBox.css';
import RoomsDropDown from '../RoomsDropDown';

class HotelParameterBox extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="hotelParameterBox" >
        <div className="DatesDiv">
          <div className="DatePicker">
            <DatePicker
              className="greenify"
              selected={moment(this.props.checkInDate)}
              onChange={date => this.verifyCheckinDate(date)}
            />
          </div>
          <div className="Arrow">
            <img className="ArrowImg" src="/arrow.png" alt="" />
          </div>
          <div className="DatePicker">
            <DatePicker
              className="greenify"
              selected={moment(this.props.checkOutDate)}
              onChange={date => this.verifyCheckoutDate(date)}
            />
          </div>
        </div>
        <div className="RoomsDiv">
          <RoomsDropDown showDropdownBlock={() => this.showDropdownBlock} />
        </div>
      </div>
    );
  }
}

export default HotelParameterBox;

