import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
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
              <input className="SearchByTextInput" type="text" placeholder="Search by City, Locality or Hotel Name" />
            </div>
            <div className="CheckInOutDates">
              <div className="CheckInPicker">
                <DatePicker
                  selected={moment()}
                />
              </div>
              <div className="Arrow">
                <img className="ArrowImg" src="/arrow.png" alt="" />
              </div>
              <div className="CheckOutPicker">
                <DatePicker
                  selected={moment()}
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
export default LandingPageBody;
