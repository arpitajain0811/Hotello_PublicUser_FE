import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import { connect } from 'react-redux';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import { setCheckInDate, setCheckOutDate, setSearchCityText, setSearchCityLatLng } from '../../redux/actions';
import './LandingPageBody.css';
import RoomsDropDown from '../RoomsDropDown';
import TypeAheadSearchBox from '../TypeAheadSearchBox';

class LandingPageBody extends React.Component {
  componentDidMount() {
    const cookie = Math.random().toString(36).substring(2, 15)
                    + Math.random().toString(36).substring(2, 15);
    window.localStorage.setItem('cookie', cookie);
  }
  verifyCheckinDate=(date) => {
    if (date >= moment(new Date())) {
      this.props.changeCheckinDate(date);
    }
  }
  verifyCheckoutDate=(date) => {
    if (date >= this.props.checkInDate) {
      console.log('inside handler:', date.format());
      this.props.changeCheckoutDate(date);
    }
  }
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
              <TypeAheadSearchBox cityPlaceholder="Search Places" saveSearchCityText={this.props.saveSearchCityText} saveSearchCityLatLng={this.props.saveSearchCityLatLng} />
              {/* <input className="SearchByTextInput" value={this.props.city} type="text" placeholder="Search Hotels by City" onChange={text => this.props.saveSearchCityText(text)} /> */}
            </div>
            <div className="CheckInOutDates">
              <div className="CheckInPicker">
                <DatePicker
                  selected={moment(this.props.checkInDate)}
                  onChange={date => this.verifyCheckinDate(date)}
                />
              </div>
              <div className="Arrow">
                <img className="ArrowImg" src="/arrow.png" alt="" />
              </div>
              <div className="CheckOutPicker">
                <DatePicker
                  selected={moment(this.props.checkOutDate)}
                  onChange={date => this.verifyCheckoutDate(date)}
                />
              </div>
            </div>
            <div className="RoomPeopleSelection">
              <RoomsDropDown borderClass="" showDropdownBlock={() => this.showDropdownBlock} />
            </div>
            <Link to="/listingPage" className="LandingPageButtonContainer" >
              <button className="LandingPageSearchButton">Search</button>
            </Link>
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
  saveSearchCityLatLng: (obj) => {
    dispatch(setSearchCityLatLng(obj));
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
  saveSearchCityText: PropTypes.func.isRequired,
  saveSearchCityLatLng: PropTypes.func.isRequired,
};

