import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import Popup from 'reactjs-popup';
import axios from 'axios';
import PropTypes from 'prop-types';
import './InvoicePage.css';
import SearchBarAndHeader from '../SearchBarAndHeaderDetails';
import getAllHotels from '../../helpers/getAllHotels';
import { storeAllHotels, storeFilteredHotels, logout } from '../../redux/actions';
import constants from '../../constants.json';
import Amenity from '../Amenity';
import Room from '../Room';
import loader from '../../images/loader2.svg';
import greenTick from '../../images/greenTick.png';
import LoginBody from '../LoginBody';
import Header from '../Header';

// window.onbeforeunload = function () {
//   window.localStorage.setItem('refresh', true);
// };
class InvoicePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hotelDetails: {},
      rooms: {},
      loaded: 1,
      scrollState: 0,
      expandedAmenities: false,
      expandedDescription: false,
      goHome: false,
      // redirect: false,
    };
    this.imgSrc = '';
    this.setImg();
  }


  componentDidMount() {
    document.body.style.overflow = 'scroll';
    this.setState({
      hotelDetails: this.props.hotelDetails,
      rooms: this.props.roomsArray,
    });
    console.log('HotelsDetails: ', this.props.hotelDetails);
  }


  setImg = () => {
    const context = require.context('../../images/rooms', true);
    const obj = {};
    context.keys().forEach((key) => {
      obj[key] = context(key);
    });
    const imgKey = Math.floor(Math.random() * Object.keys(obj).length);
    let imgSrc = Object.keys(obj)[imgKey];
    imgSrc = `../../images/rooms${imgSrc.slice(1)}`;
    this.imgSrc = imgSrc;
  }

  logoutHandler = () => {
    // console.log('in ListingPage logoutHandler');
    this.props.logout();
  }
  updateSearch=() => {
    let inDate = this.props.checkInDate.format();
    let outDate = this.props.checkOutDate.format();
    console.log(inDate, outDate);
    inDate = inDate.substring(0, inDate.lastIndexOf('T'));
    outDate = outDate.substring(0, outDate.lastIndexOf('T'));

    getAllHotels(
      this.props.city,
      inDate, outDate,
      this.props.rooms,
    ).then((response) => {
      this.props.saveAllHotels(response.hotelResultSet);
      axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${this.props.city}&key=${constants.API_KEY}`).then((value) => {
        console.log(value.data.results[0].geometry.location);
      });
    });
  }

  render() {
    // if (window.localStorage.getItem('refresh') === 'true') {
    //   return <Redirect to="/" />;
    // }
    console.log(this.props.userName);
    let roomString = `${this.props.rooms.length} Room`;
    if (this.props.rooms.length > 1) {
      roomString = `${this.props.rooms.length} Rooms`;
    }
    let noOfAdults = 0;
    let noOfChildren = 0;
    this.props.rooms.forEach((room) => {
      noOfAdults += room.ADT;
      noOfChildren += room.CHD;
    });
    let adultString = `${noOfAdults} Adult`;
    if (noOfAdults > 1) {
      adultString = `${noOfAdults} Adults`;
    }
    let childrenString = `${noOfChildren} Child`;
    if (noOfChildren > 1) {
      childrenString = `${noOfChildren} Children`;
    } else if (noOfChildren === 0) {
      childrenString = '';
    }

    const finalRoomStatus = `${roomString}, ${adultString}, ${childrenString}`;
    // console.log('The image source is: ', imgSrc);
    let roomsArray;
    const usedRooms = [];
    let amenities;
    let flag;
    if (this.state.hotelDetails.rooms) {
      roomsArray = this.state.hotelDetails.rooms.map((room, i) => {
        if (this.props.currentId === room.booking_id) {
          console.log('inside room match');
          return (
            <Room
              type={room.description[0]}
              bookingId={room.booking_id}
              selected={0}
              updatePrice={this.updatePrice}
              hotelId={this.state.hotelDetails.hotel_code}
              clickable={0}
            />
          );
        }
      });
      // console.log('The buttons are: ', buttons);
    }
    // roomsArray = Array.prototype.slice.call(roomsArray)


    let allAmenities;

    if (this.state.hotelDetails.amenities) {
      amenities = Object.keys(this.state.hotelDetails.amenities).map(key => (
        <Amenity text={key} />
      ));
      allAmenities = Array.prototype.slice.call(amenities);
      amenities = allAmenities.slice(1, 5);
      if (!this.state.expandedAmenities) {
        allAmenities = [];
      } else {
        allAmenities = allAmenities.slice(5);
      }
    }

    let moreAmenities = '';
    if (this.state.expandedAmenities) {
      moreAmenities = 'Less  ▴';
    } else {
      moreAmenities = 'More Amenities ▾';
    }
    let hotelDescription = '';
    if (this.state.hotelDetails.description) {
      if (this.state.expandedDescription) {
        hotelDescription = this.state.hotelDetails.description;
      } else {
        hotelDescription = `${this.state.hotelDetails.description.substring(0, 550)} ...`;
      }
    }
    let moreDescription = '';
    if (this.state.expandedDescription) {
      moreDescription = 'Less  ▴';
    } else {
      moreDescription = 'Read More About Hotels ▾';
    }


    // if (this.state.loaded === 0) {
    //   return (
    //     <div className="detailsPage" >
    //       <SearchBarAndHeader updateSearch={this.updateSearch} logoutHandler={this.logoutHandler} />
    //       <img src={this.imgSrc} className="hotelImage" />
    //       <div className="detailsPageContainer">
    //         <div className="mainBody">
    //           <img src={loader} />
    //         </div>
    //       </div>
    //     </div>
    //   );
    // }
    if (this.state.goHome === true) {
      return (
        <Redirect to="/" />
      );
    }
    return (
      <div className="detailsPage1" >
      <div className="InvoiceHeader">
      <Header
        isLoggedIn={this.props.isLoggedIn}
        logoutHandler={this.logoutHandler}
        firstName={this.props.firstName}
        profileButtonClass="profileButtonBlack"
        logoGreen
      />
      </div>
        <div className="bookingConfirmation1" >
          <img src={greenTick} alt="" className="greenTick" />
          <div className="bookingText1">Booking Confirmed </div>
          <div className="bookingId">{this.props.bookingId}</div>
          <div className="buttonsContainer">
          <button
            onClick={() => {
            this.setState({
              goHome: true,
            });
          }}
            className="printButton"
          > Home
          </button>
          <button onClick={() => { window.print(); }} className="printButton">Print</button>
          </div>
        </div>
        <div className="invoicePageContainer">

          <div className="mainBody1">
            <div className="hotelDetailsContainer1">
              <div className="hotelName1">
                {this.state.hotelDetails.hotel_name}
              </div>
              {
                this.state.hotelDetails.location &&
                <div className="address">
                  {this.state.hotelDetails.location.address}
                </div>
              }
              <div className="description">
                <div className="hotelDescription">
                  {hotelDescription}
                </div>
                <div
                  className="amenitiesButton"
                  onClick={() => {
                this.setState({
                  expandedDescription: !this.state.expandedDescription,
                });
              }}
                >
                  {moreDescription}
                </div>
              </div>
              <hr className="PaymentPageLine" />
              <div className="subHeading">
              Amenities
              </div>
              <div className="amenities">
                {amenities}
              </div>
              <div className="moreAmenities">
                <div className="expandedAmenities">
                  {allAmenities}
                </div>
                <div
                  className="amenitiesButton"
                  onClick={() => {
                this.setState({
                  expandedAmenities: !this.state.expandedAmenities,
                });
              }}
                >
                  {moreAmenities}
                </div>
              </div>
              <hr className="PaymentPageLine" />
              <div className="subHeading">
              Room Type
              </div>
              <div className="roomType1" >
                {roomsArray}
              </div>
            </div>

              {this.state.rooms[this.props.currentId] && <div className="bookingDetailsContainer1">
              {/* Booking Details */}
              <div className="Booking-Summary1" >
              <div className="Selected-Hotel-Name">
                      ₹{((this.state.rooms[this.props.currentId].price.total * 65) + 500 + (0.18 * (this.state.rooms[this.props.currentId].price.total * 65))).toFixed(0)}<span className="night">/NIGHT</span>
              </div>
                <div className="Search-Selected-Details1">
                  <div className="Search-Selected-CheckInOutDates1">
                  {this.props.checkInDate.toString().substring(0, 3)}, {this.props.checkInDate.toString().substring(4, 11)}
                    <span className="dataArrow">→</span>
                    {this.props.checkOutDate.toString().substring(0, 3)}, {this.props.checkOutDate.toString().substring(4, 11)}

                  </div>
                  <div className="Search-Selected-Rooms1">
                    {finalRoomStatus}
                  </div>
                </div>
                <hr className="PaymentPageLine" />
                <div className="DetailsPageAmounts">
                  <div className="BasePay">
                    <div>
                      ₹{(this.state.rooms[this.props.currentId].price.total * 65).toFixed(0)} X {this.props.checkOutDate.diff(this.props.checkInDate, 'days')} X 1
                    </div>
                    <div>
                      ₹{(this.state.rooms[this.props.currentId].price.total * 65).toFixed(0)}
                    </div>
                  </div>
                  <hr className="PaymentPageLine" />
                  <div className="ServiceFee">
                    <div>Service Fee</div>
                    <div> ₹500</div>
                  </div>
                  <hr className="PaymentPageLine" />
                  <div className="Taxes">
                    <div>Taxes (18% GST)</div>
                    <div>
                      ₹{(0.18 * (this.state.rooms[this.props.currentId].price.total * 65)).toFixed(0)}
                    </div>

                  </div>
                  <hr className="PaymentPageLine" />
                  <div className="TotalAmount">
                    <div className="boldText">Amount Paid</div>
                    <div>
                      ₹{((this.state.rooms[this.props.currentId].price.total * 65) + 500 + (0.18 * (this.state.rooms[this.props.currentId].price.total * 65))).toFixed(0)}
                    </div>
                  </div>
                </div>
              </div>
                                                         </div>}
          </div>
        </div>
      </div>
    );
  }
}


const mapDispatchToProps = dispatch => ({
  saveAllHotels: (allHotelsArray) => {
    dispatch(storeAllHotels(allHotelsArray));
  },
  saveFilteredHotels: (filteredHotelsArray) => {
    dispatch(storeFilteredHotels(filteredHotelsArray));
  },
  logout: () => {
    dispatch(logout());
  },
});

const mapStateToProps = state => ({
  userName: state.userReducer.firstName,
  allHotels: state.storeHotels.allHotels,
  checkInDate: state.searchOptions.checkInDate,
  checkOutDate: state.searchOptions.checkOutDate,
  city: state.searchOptions.city,
  rooms: state.searchOptions.rooms,
  currentId: state.manageRooms.currentRoomId,
  isLoggedIn: state.userReducer.isLoggedIn,
  hotelDetails: state.manageRooms.hotelDetails,
  roomsArray: state.manageRooms.rooms,
  bookingId: state.manageRooms.bookingId,
});
export default connect(mapStateToProps, mapDispatchToProps)(InvoicePage);
InvoicePage.propTypes = {
  currentId: PropTypes.string.isRequired,
  logout: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  changeLoginState: PropTypes.func.isRequired,
};
