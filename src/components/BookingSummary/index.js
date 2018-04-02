import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { updateBookingStatus } from '../../redux/actions';
import './BookingSummary.css';

class BookingSummary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      goTo: null,
    };
  }
  makePayment=() => {
    console.log('ho');
    const auth = window.localStorage.getItem('token');
    const cookie = window.localStorage.getItem('cookie');
    fetch('/makePayment', {
      method: 'POST',
      headers: {
        authorization: auth,
        sessionId: cookie,
      },
      body: JSON.stringify({
        basket: this.props.bookDetails.bookBasket,
        amount: this.props.rooms[this.props.currentId].price.total,
      }),
    }).then((response) => {
      if (response.status === 401) {
        window.localStorage.setItem('token', null);
        this.setState({ goTo: '/' });
      } else {
        fetch('/bookHotel', {
          method: 'POST',
          headers: {
            authorization: auth,
            sessionId: cookie,
          },
          body: JSON.stringify(this.props.bookDetails),
        }).then((data) => {
          if (data.status === 401) {
            return 'Login invalid';
          }
          return data.json();
        }).then((bookingResponse) => {
          if (bookingResponse === 'Login invalid') {
            window.localStorage.setItem('token', null);
            this.setState({ goTo: '/' });
          } else {
            console.log('Server booking response is: ', bookingResponse);
            this.props.updateBookingStatus(bookingResponse.bookingid, bookingResponse.status);
            this.setState({ goTo: '/invoice' });
          }
        }).catch(() => {
          this.setState({ goTo: '/error' });
        });
      }
    }).catch(() => {
      this.setState({ goTo: '/error' });
    });
  }
  render() {
    if (this.state.goTo !== null) {
      return <Redirect to={this.state.goTo} />;
    }
    const stars = [];
    for (let i = 0; i < Number(this.props.hotelDetails.stars); i += 1) {
      stars.push((<img
        src="/star.svg"
        className="star"
        alt="star"
        key={i}
      />));
    }
    for (let i = 0; i < (5 - Number(this.props.hotelDetails.stars)); i += 1) {
      stars.push((<img
        src="/star-grey.svg"
        className="star-grey"
        alt="star-grey"
        key={Number(this.props.hotelDetails.stars) + i}
      />));
    }
    let childrenString = '';
    if (this.props.totalChildren === 1) childrenString = ', 1 child';
    else if (this.props.totalChildren > 1) {
      childrenString = `, ${this.props.totalChildren} children`;
    }
    let Room = 'Room';
    if (this.props.totalRooms > 1) { Room = 'Rooms'; }
    let Adults = 'Adult';
    if (this.props.totalAdults > 1) Adults = 'Adults';
    let nights = '';
    // let numOfNights = 0;
    // const checkOut = Number(this.props.checkOutDate._d.toString().slice(8, 10));
    // const checkIn = Number(this.props.checkInDate._d.toString().slice(8, 10));
    // numOfNights = checkOut - checkIn;
    let numOfNights = this.props.checkOutDate.diff(this.props.checkInDate, 'days');
    if ((this.props.checkOutDate.date() - this.props.checkInDate.date()) !== 1) {
      numOfNights += 1;
    }
    if (numOfNights > 1) nights = `${numOfNights} Nights`;
    else nights = `${numOfNights} Night`;
    const amtPerNightPerRoom = Math.round(this.props.rooms[this.props.currentId].price.total * numOfNights * 1 * 65);
    console.log(amtPerNightPerRoom);
    return (
      <div className="BookingSummary" >
        <div className="HotelNameWithStars">

          <div className="SelectedHotelName">
            {this.props.hotelDetails.hotel_name}
          </div>
          <div className="SelectedHotelStars">
            {stars}
          </div>
        </div>
        <div className="TotalAmountForMobile">
        ₹{Math.round((0.18 * amtPerNightPerRoom) + this.props.serviceFee + amtPerNightPerRoom)}
        </div>
        <hr className="PaymentPageLine" />
        <div className="SearchSelectedDetails">
          <div className="SearchSelectedCheckInOutDates">
          {this.props.checkInDate.toString().substring(0, 3)}, {this.props.checkInDate.toString().substring(4, 11)}
          <div className="PaymentpageArrow">
              <img className="PaymentPageArrowImg" src="/arrow.png" alt="" />
          </div>
            {this.props.checkOutDate.toString().substring(0, 3)}, {this.props.checkOutDate.toString().substring(4, 11)}

          </div>
          <div className="SearchSelectedRooms">
            1 {Room}, {this.props.totalAdults} {Adults}{childrenString}
          </div>
        </div>
        <hr className="PaymentPageLine" />
        <div className="PriceDeatils" >
          <div className="BasePay">
            <div>₹{Math.round(this.props.rooms[this.props.currentId].price.total)} X {nights} X 1 {Room}</div>
            <div> ₹{amtPerNightPerRoom}</div>
          </div>
          <hr className="PaymentPageLine" />
          <div className="ServiceFee">
            <div>Service Fee</div>
            <div> ₹{this.props.serviceFee}</div>
          </div>
          <hr className="PaymentPageLine" />
          <div className="Taxes">
            <div>Taxes</div>
            <div> ₹{Math.round(0.18 * amtPerNightPerRoom)}</div>

          </div>
          <hr className="PaymentPageLine" />
          <div className="TotalAmount">
            <div>Total</div>
            <div> ₹{Math.round((0.18 * amtPerNightPerRoom) + this.props.serviceFee + amtPerNightPerRoom)}</div>
          </div>
        </div>
        <div className="MakePaymentButtonDiv" >
          <button onClick={() => this.makePayment()} disabled={this.props.isAnyFieldEmpty} className="MakePaymentButton">Make Payment</button>
        </div>
      </div>
    );
  }
}

BookingSummary.defaultProps = {
  hotelName: 'The Ritz Plaza',
  stars: '4',
  totalAdults: 1,
  totalRooms: 1,
  totalChildren: 0,
  amountPerNight: 3000,
  serviceFee: 500,
  RoomId: '00334399-d1f4-4fec-b7a7-189af47b4f40',
  amount: 1235,
};
const mapStateToProps = state => ({
  checkInDate: state.searchOptions.checkInDate,
  checkOutDate: state.searchOptions.checkOutDate,
  totalAdults: state.searchOptions.totalAdults,
  totalChildren: state.searchOptions.totalChildren,
  totalRooms: state.searchOptions.totalRooms,
  bookDetails: state.userReducer.bookDetails,
  currentId: state.manageRooms.currentRoomId,
  rooms: state.manageRooms.rooms,
  hotelDetails: state.manageRooms.hotelDetails,
});

const mapDispatchToProps = dispatch => ({
  updateBookingStatus: (bookingId, status) => {
    dispatch(updateBookingStatus(bookingId, status));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(BookingSummary);
BookingSummary.propTypes = {
  hotelName: PropTypes.string,
  stars: PropTypes.string,
  totalChildren: PropTypes.number,
  totalAdults: PropTypes.number,
  totalRooms: PropTypes.number,
  checkOutDate: PropTypes.objectOf.isRequired,
  checkInDate: PropTypes.objectOf.isRequired,
  amountPerNight: PropTypes.number,
  serviceFee: PropTypes.number,
  RoomId: PropTypes.string,
  amount: PropTypes.number,
  isAnyFieldEmpty: PropTypes.bool.isRequired,
};
