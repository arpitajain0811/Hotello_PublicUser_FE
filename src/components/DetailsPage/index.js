import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import Popup from 'reactjs-popup';
import axios from 'axios';
import PropTypes from 'prop-types';
import './DetailsPage.css';
import SearchBarAndHeader from '../SearchBarAndHeaderDetails';
import getAllHotels from '../../helpers/getAllHotels';
import { storeAllHotels, storeFilteredHotels, logout, updateHotelDetails, updateRedirect, updateBookBasket, setRoomTypeArray, setRoomTypeEditable } from '../../redux/actions';
import constants from '../../constants.json';
import Amenity from '../Amenity';
import Room from '../Room';
import loader from '../../images/loader2.svg';
import LoginBody from '../LoginBody';


class DetailsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hotelDetails: {},
      rooms: {},
      loaded: 0,
      scrollState: 0,
      expandedAmenities: false,
      expandedDescription: false,
    };
    this.imgSrc = '';
    this.setImg();
  }


  componentDidMount() {
    this.props.setRoomTypeEditable();
    // console.log('Rooms are:', this.props.rooms);
    window.addEventListener('scroll', this.handleScroll);
    console.log('Match type is: ', typeof this.props.match);
    fetch(`/viewHotelDetails/${this.props.match.params.value}`, {
      headers: {
        sessionId: window.localStorage.getItem('cookie'),
      },
    }).then(data => data.json()).then((response) => {
      console.log(response);
      this.setState({
        hotelDetails: response.hotel_details,
      }, () => {
        const usedRooms = [];
        let flag;
        this.state.hotelDetails.rooms.forEach((room) => {
          flag = 1;
          usedRooms.forEach((type) => {
            if (type === room.description[0]) {
              flag = 0;
            }
          });
          if (flag === 1) {
            usedRooms.push(room.description[0]);
            fetch(`/getRoomDetails/${this.state.hotelDetails.hotel_code}/${room.booking_id}`).then(roomData => roomData.json()).then((roomJson) => {
              // This line creates a clone of a nested object
              const tempObj = JSON.parse(JSON.stringify(this.state.rooms));
              tempObj[room.booking_id] = roomJson.hotel_room_details;
              this.setState({
                rooms: tempObj,
                loaded: 1,
              }, () => {
                this.props.updateHotelDetails(this.state.hotelDetails, this.state.rooms);
              });
            });
          }
        });
      });
    });
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
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

  handleScroll = () => {
    if (window.scrollY > (0.4 * window.innerHeight)) {
      this.setState({
        scrollState: 1,
      });
    } else {
      // console.log('else Fired');
      this.setState({
        scrollState: 0,
      });
    }
  }

  // updatePrice = (value) => {
  //   this.setState({
  //     currentPrice: value,
  //   });
  // }
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
    // console.log(this.props.userName);
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
    let childrenString = `, ${noOfChildren} Child`;
    if (noOfChildren > 1) {
      childrenString = `, ${noOfChildren} Children`;
    } else if (noOfChildren === 0) {
      childrenString = '';
    }

    const finalRoomStatus = `${roomString}, ${adultString}${childrenString}`;
    // console.log('The image source is: ', imgSrc);
    let roomsArray;
    const usedRooms = [];
    let amenities;
    let flag;
    if (this.state.hotelDetails.rooms) {
      roomsArray = this.state.hotelDetails.rooms.map((room, i) => {
        flag = 1;
        usedRooms.forEach((type) => {
          if (type === room.description[0]) {
            flag = 0;
          }
        });
        if (flag === 1) {
          usedRooms.push(room.description[0]);
          if (i === 0) {
            return (
              <Room
                type={room.description[0]}
                bookingId={room.booking_id}
                selected={1}
                updatePrice={this.updatePrice}
                hotelId={this.state.hotelDetails.hotel_code}
              />
            );
          }
          return (
            <Room
              type={room.description[0]}
              bookingId={room.booking_id}
              selected={0}
              updatePrice={this.updatePrice}
              hotelId={this.state.hotelDetails.hotel_code}
            />
          );
        }
      });
      // console.log('The buttons are: ', buttons);
    }
    // roomsArray = Array.prototype.slice.call(roomsArray)
    this.props.setRoomTypeArray(roomsArray);

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


    const stars = [];
    for (let i = 0; i < Number(this.state.hotelDetails.stars); i += 1) {
      stars.push((<img
        src="/star.svg"
        className="star"
        alt="star"
        key={i}
      />));
    }
    for (let i = 0; i < (5 - Number(this.state.hotelDetails.stars)); i += 1) {
      stars.push((<img
        src="/star-grey.svg"
        className="star-grey"
        alt="star-grey"
        key={Number(this.state.hotelDetails.stars) + i}
      />));
    }
    let bookButton;
    if (this.props.isLoggedIn) {
      bookButton = (<button
        className="MakePaymentButton"
      >Book
                    </button>);
    } else {
      bookButton = (<Popup
        className="MyPopup"
        trigger={<button
          className="MakePaymentButton"
        >Book
                 </button>}
        modal
      >
        {close => (
          <div className="modal">
            <a className="close" onClick={() => { close(); }}>
            &times;
            </a>
            <div className="SignUpHeader"> Sign In </div>
            <div className="content">
              <LoginBody closeFunc={() => { close(); }} />
            </div>
          </div>
        )}
                    </Popup>);
    }
    if (this.props.redirect && this.props.isLoggedIn) {
      console.log('inside redirecting block');
      this.props.updateRedirect();
      this.props.updateBookBasket(this.props.currentId);
      return (<Redirect to="/userbookingdetails" />);
    }

    if (this.state.loaded === 0) {
      return (
        <div className="detailsPage" >
          <SearchBarAndHeader updateSearch={this.updateSearch} logoutHandler={this.logoutHandler} />
          <img src={this.imgSrc} className="hotelImage" alt="" />
          <div className="detailsPageContainer">
            <div className="mainBody">
              <img src={loader} alt="" />
            </div>
          </div>
        </div>
      );
    }

    return (
        <div className="detailsPage" >
          <SearchBarAndHeader
            updateSearch={this.updateSearch}
            type={this.state.scrollState}
            logoutHandler={this.logoutHandler}
          />
          <img src={this.imgSrc} alt="" className="hotelImage" />
          <div className="detailsPageContainer">
            <Link to="/listingPage" className="removeTextDecoration">
              <div className="backSection">
                <div className="backArrow">◀</div><div className="backButton">Back</div>
              </div>
            </Link>
            <div className="mainBody">
              <div className="hotelDetailsContainer">
                <div className="hotelName">
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
                <div className="roomType" >
                  {roomsArray}
                </div>
              </div>

              {this.state.rooms[this.props.currentId] && <div className="bookingDetailsContainer">
                <div className="Booking-Summary" >
                  <div className="HotelNameWithStars">
                    <div className="Selected-Hotel-Name">
                      ₹{(this.state.rooms[this.props.currentId].price.total * 65).toFixed(0)}<span className="night">/NIGHT</span>
                    </div>

                    <div className="SelectedHotelStars">
                      {stars}
                    </div>
                  </div>
                  <hr className="PaymentPageLine" />
                  <div className="Search-Selected-Details">
                    <div className="Search-Selected-CheckInOutDates">
                     {this.props.checkInDate.toString().substring(0, 3)}, {this.props.checkInDate.toString().substring(4, 11)}
                      <span className="dataArrow">→</span>
                      {this.props.checkOutDate.toString().substring(0, 3)}, {this.props.checkOutDate.toString().substring(4, 11)}

                    </div>
                    <div className="Search-Selected-Rooms">
                      {finalRoomStatus}
                    </div>
                  </div>
                  <hr className="PaymentPageLine" />
                  <div className="AmountsContainer">
                    <div className="BasePay">
                      <div>
                        ₹{(this.state.rooms[this.props.currentId].price.total * 65).toFixed(0)} X {this.props.checkOutDate.diff(this.props.checkInDate, 'days')} night X 1 room
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
                      <div>Total</div>
                      <div>
                        ₹{((this.state.rooms[this.props.currentId].price.total * 65) + 500 + (0.18 * (this.state.rooms[this.props.currentId].price.total * 65))).toFixed(0)}
                      </div>
                    </div>
                  </div>
                  <div
                    className="MakePaymentButtonDiv"
                    onClick={() => {
                    this.props.updateRedirect();
                    console.log('PROPS ARE: ', this.props.redirect, this.props.isLoggedIn);
                  }}
                  >
                    {bookButton}
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
  updateHotelDetails: (hotelDetails, rooms) => {
    dispatch(updateHotelDetails(hotelDetails, rooms));
  },
  updateRedirect: () => {
    dispatch(updateRedirect());
  },
  updateBookBasket: (bookingId) => {
    dispatch(updateBookBasket(bookingId));
  },
  setRoomTypeArray: (roomsArray) => {
    dispatch(setRoomTypeArray(roomsArray));
  },
  setRoomTypeEditable: () => {
    dispatch(setRoomTypeEditable());
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
  redirect: state.manageRooms.redirect,
});
export default connect(mapStateToProps, mapDispatchToProps)(DetailsPage);
DetailsPage.propTypes = {
  currentId: PropTypes.string.isRequired,
  logout: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  setRoomTypeArray: PropTypes.func.isRequired,
  saveAllHotels: PropTypes.func.isRequired,
  setRoomTypeEditable: PropTypes.func.isRequired,
};
