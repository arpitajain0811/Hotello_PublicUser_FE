import React from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import { connect } from 'react-redux';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import { setCheckInDate, setCheckOutDate } from '../../redux/actions';
import './LandingPageBody.css';

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
              <input className="SearchByTextInput" type="text" placeholder="Search Hotels by City" />
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
              {/* <RoomsDropDown /> */}
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
});
const mapStateToProps = state => ({
  checkInDate: state.searchOptions.checkInDate,
  checkOutDate: state.searchOptions.checkOutDate,

});
export default connect(mapStateToProps, mapDispatchToProps)(LandingPageBody);
LandingPageBody.propTypes = {
  checkInDate: PropTypes.string.isRequired,
  checkOutDate: PropTypes.string.isRequired,
  changeCheckinDate: PropTypes.func.isRequired,
  changeCheckoutDate: PropTypes.func.isRequired,
};

