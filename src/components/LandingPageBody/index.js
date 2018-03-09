import React from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import { connect } from 'react-redux';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import { setCheckInDate, setCheckOutDate, setSearchCityText } from '../../redux/actions';
import './LandingPageBody.css';
import RoomsDropDown from '../RoomsDropDown';
// import RoomsDropdownField from '../RoomsDropdownField';

class LandingPageBody extends React.Component {
  render() {
    return (
      <div className="LandingPageBody" >
        <div className="LandingPageBodyContent">
          <div className="LandingPageCaptionBox" >
            <div className="LandingPageCaption">
        A new selection of hotels verified for your quality & comfort. <span className="ExploreNow" >Explore Now!</span>
            </div>
          </div>
          <div className="LandingPageSearchBox">
            <div className="SearchByBox">
              <input className="SearchByTextInput" value={this.props.city} type="text" placeholder="Search Hotels by City" onChange={text => this.props.saveSearchCityText(text)} />
            </div>
            <div className="CheckInOutDates">
              <div className="CheckInPicker">
                <DatePicker
                  selected={moment(this.props.checkInDate)}
                  onChange={date => this.props.changeCheckinDate(date)}
                />
              </div>
              <div className="Arrow">
                <img className="ArrowImg" src="/arrow.png" alt="" />
              </div>
              <div className="CheckOutPicker">
                <DatePicker
                  selected={moment(this.props.checkOutDate)}
                  onChange={date => this.props.changeCheckoutDate(date)}
                />
              </div>
            </div>
            <div className="RoomPeopleSelection">
              <RoomsDropDown showDropdownBlock={() => this.showDropdownBlock} />
            </div>
            <div className="LandingPageButtonContainer">
              <button className="LandingPageSearchButton">Search</button>
            </div>

          </div>
        </div>
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => ({
  changeCheckinDate: (date) => {
    dispatch(setCheckInDate(date));
  },
  changeCheckoutDate: (date) => {
    dispatch(setCheckOutDate(date));
  },
  saveSearchCityText: (text) => {
    dispatch(setSearchCityText(text));
  },
});
const mapStateToProps = state => ({
  checkInDate: state.searchOptions.checkInDate,
  checkOutDate: state.searchOptions.checkOutDate,
  city: state.searchOptions.city,
});
export default connect(mapStateToProps, mapDispatchToProps)(LandingPageBody);
LandingPageBody.propTypes = {
  checkInDate: PropTypes.objectOf.isRequired,
  checkOutDate: PropTypes.objectOf.isRequired,
  changeCheckinDate: PropTypes.func.isRequired,
  changeCheckoutDate: PropTypes.func.isRequired,
  city: PropTypes.string.isRequired,
};

