import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import './DetailsPage.css';
import SearchBarAndHeader from '../SearchBarAndHeader';
import getAllHotels from '../../helpers/getAllHotels';
import { storeAllHotels, storeFilteredHotels } from '../../redux/actions';
import constants from '../../constants.json';
import Amenity from '../Amenity';
import Room from '../Room';
import loader from '../../images/loader2.svg';

class DetailsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hotelDetails: {},
      currentPrice: 0,
      rooms: {},
      loaded: 0,
    };
    this.imgSrc = '';
    this.setImg();
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
  componentDidMount() {
    fetch(`/viewHotelDetails/${this.props.match.params.value}`, {}).then(data => data.json()).then((response) => {
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
              });
            });
          }
        });
      });
    });
  }

  updatePrice = (value) => {
    this.setState({
      currentPrice: value,
    });
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
    console.log(this.props.userName);

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

    if (this.state.hotelDetails.amenities) {
      amenities = Object.keys(this.state.hotelDetails.amenities).map(key => (
        <Amenity text={key} />
      ));
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

    if (this.state.loaded === 0) {
      return (
        <div className="detailsPage" >
          <SearchBarAndHeader updateSearch={this.updateSearch} />
          <img src={this.imgSrc} className="hotelImage" />
          <div className="mainBody">
            <img src={loader} />
          </div>
        </div>
      );
    }

    return (
      <div className="detailsPage" >
        <SearchBarAndHeader updateSearch={this.updateSearch} />
        <img src={this.imgSrc} className="hotelImage" />
        <div className="mainBody">
          <div className="hotelDetailsContainer">
            <div className="hotelName">
              {this.state.hotelDetails.hotel_name}
            </div>
            {
                this.state.hotelDetails.location && <div className="address">
                  {this.state.hotelDetails.location.address}
                                                    </div>
              }
            <div className="description">
              {this.state.hotelDetails.description}
            </div>
            <div className="subHeading">
              Amenities
            </div>
            <div className="amenities">
              {amenities}
            </div>
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
                <div className="SelectedHotelName">
                    ₹{(this.state.rooms[this.props.currentId].price.total * 65).toFixed(0)}/NIGHT
                </div>

                <div className="SelectedHotelStars">
                  {stars}
                </div>
              </div>
              <hr className="PaymentPageLine" />
              <div className="SearchSelectedDetails">
                <div className="SearchSelectedCheckInOutDates">
                  {this.props.checkInDate.toString().substring(0, 15)}
                  <div className="PaymentpageArrow">
                    <img className="PaymentPageArrowImg" src="/arrow.png" alt="" />
                  </div>
                  {this.props.checkOutDate.toString().substring(0, 15)}

                </div>
                <div className="SearchSelectedRooms">
                    rooms,
                </div>
              </div>
              <hr className="PaymentPageLine" />
              <div className="PriceDeatils" >
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
                  <div>Total</div>
                  <div>
                      ₹{((this.state.rooms[this.props.currentId].price.total * 65) + 500 + (0.18 * (this.state.rooms[this.props.currentId].price.total * 65))).toFixed(0)}
                  </div>
                </div>
              </div>
              <div className="MakePaymentButtonDiv" >
                <button className="MakePaymentButton">Book</button>
              </div>
            </div>
                                                     </div>}
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
});

const mapStateToProps = state => ({
  userName: state.userReducer.firstName,
  allHotels: state.storeHotels.allHotels,
  checkInDate: state.searchOptions.checkInDate,
  checkOutDate: state.searchOptions.checkOutDate,
  city: state.searchOptions.city,
  rooms: state.searchOptions.rooms,
  currentId: state.manageRooms.currentRoomId,
});
export default connect(mapStateToProps, mapDispatchToProps)(DetailsPage);
