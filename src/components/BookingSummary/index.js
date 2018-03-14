import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './BookingSummary.css';

class BookingSummary extends React.Component {
  makePayment=() => {
    const auth = window.localStorage.getItem('token');
    const cookie = window.localStorage.getItem('cookie');
    fetch('/makePayment', {
      method: 'POST',
      headers: {
        authorization: auth,
        sessionId: cookie,
      },
      body: JSON.stringify({
        basket: [this.props.RoomId],
        amount: this.props.amount,
      }),
    }).then((res) => {
    });
  }
  render() {
    const stars = [];
    for (let i = 0; i < Number(this.props.stars); i += 1) {
      stars.push((<img
        src="/star.svg"
        className="star"
        alt="star"
        key={i}
      />));
    }
    for (let i = 0; i < (5 - Number(this.props.stars)); i += 1) {
      stars.push((<img
        src="/star-grey.svg"
        className="star-grey"
        alt="star-grey"
        key={Number(this.props.stars) + i}
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
    let numOfNights = 0;
    const checkOut = Number(this.props.checkOutDate._d.toString().slice(8, 10));
    const checkIn = Number(this.props.checkInDate._d.toString().slice(8, 10));
    numOfNights = checkOut - checkIn;
    if (numOfNights > 1) nights = `${numOfNights} Nights`;
    else nights = `${numOfNights} Night`;
    const amtPerNightPerRoom = this.props.amountPerNight * numOfNights * this.props.totalRooms;
    return (
      <div className="BookingSummary" >
        <div className="HotelNameWithStars">

          <div className="SelectedHotelName">
            {this.props.hotelName}
          </div>
          <div className="SelectedHotelStars">
            {stars}
          </div>
        </div>
        <hr className="PaymentPageLine" />
        <div className="SearchSelectedDetails">
          <div className="SearchSelectedCheckInOutDates">
            {this.props.checkInDate.format('MM/DD/YYYY')}
            <div className="PaymentpageArrow">
              <img className="PaymentPageArrowImg" src="/arrow.png" alt="" />
            </div>
            {this.props.checkOutDate.format('MM/DD/YYYY')}

          </div>
          <div className="SearchSelectedRooms">
            {this.props.totalRooms} {Room}, {this.props.totalAdults} {Adults}{childrenString}
          </div>
        </div>
        <hr className="PaymentPageLine" />
        <div className="PriceDeatils" >
          <div className="BasePay">
            <div>₹{this.props.amountPerNight} X {nights} X {this.props.totalRooms} {Room}</div>
            <div> ₹{amtPerNightPerRoom}</div>
          </div>
          <hr className="PaymentPageLine" />
          <div className="ServiceFee">
            <div>Service Fee</div>
            <div> ₹{this.props.serviceFee}</div>
          </div>
          <hr className="PaymentPageLine" />
          <div className="Taxes">
            <div>Taxes (18% GST)</div>
            <div> ₹{0.18 * amtPerNightPerRoom}</div>

          </div>
          <hr className="PaymentPageLine" />
          <div className="TotalAmount">
            <div>Total</div>
            <div> ₹{(0.18 * amtPerNightPerRoom) + this.props.serviceFee + amtPerNightPerRoom}</div>
          </div>
        </div>
        <div className="MakePaymentButtonDiv" >
          <button onClick={() => this.makePayment()} className="MakePaymentButton">Make Payment</button>
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
  serviceFee: 700,
  RoomId: '00334399-d1f4-4fec-b7a7-189af47b4f40',
  amount: 1235,
};
const mapStateToProps = state => ({
  checkInDate: state.searchOptions.checkInDate,
  checkOutDate: state.searchOptions.checkOutDate,
  totalAdults: state.searchOptions.totalAdults,
  totalChildren: state.searchOptions.totalChildren,
  totalRooms: state.searchOptions.totalRooms,
});
export default connect(mapStateToProps, null)(BookingSummary);
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
};
