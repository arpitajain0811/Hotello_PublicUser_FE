import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Payment from 'payment';
import Room from '../Room';
import './PaymentForm.css';

class CreditCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imgSrc: '',
      cardNumber: '',
      cardHolderName: '',
      expiry: '',
      cvv: '',
    };
  }
  componentDidMount() {
    const { number, expiration, cvc } = this.refs;
    Payment.formatCardNumber(number);
    Payment.formatCardExpiry(expiration);
    Payment.formatCardCVC(cvc);
  }

  getCardType=(event) => {
    const type = Payment.fns.cardType(event.target.value);
    console.log(type);
    if (type === 'mastercard') {
      this.setState({
        imgSrc: '/mastercard.png',
      });
    } else if (type === 'visa') {
      this.setState({
        imgSrc: '/visa.png',
      });
    } else if (type === 'amex') {
      this.setState({
        imgSrc: '/amex.png',
      });
    } else if (type === 'jcb') {
      this.setState({
        imgSrc: '/jcb.png',
      });
    } else if (type === 'dinersclub') {
      this.setState({
        imgSrc: '/dinersclub.png',
      });
    } else if (type === 'discover') {
      this.setState({
        imgSrc: '/discover.png',
      });
    } else {
      this.setState({
        imgSrc: '',
        cardNumber: event.target.value,
      });
    }
    this.setState({
      cardNumber: event.target.value,
    }, () => this.checkIfNoFieldEmpty());
  }
  handleCardHolderName=(event) => {
    this.setState({
      cardHolderName: event.target.value,
    }, () => this.checkIfNoFieldEmpty());
  }
  handleCvv=(event) => {
    this.setState({
      cvv: event.target.value,
    }, () => this.checkIfNoFieldEmpty());
  }
   handleExpiration=(event) => {
     this.setState({
       expiry: event.target.value,
     }, () => this.checkIfNoFieldEmpty());
   }
  checkIfNoFieldEmpty=() => {
    console.log('checkIfNoFieldEmpty called', this.state.cardNumber, this.state.cardHolderName, this.state.cvv, this.state.expiry);
    if (this.state.cardNumber !== '' && this.state.cardHolderName !== '' && this.state.expiry !== '' && this.state.cvv !== '') { this.props.setNoFieldsEmpty(false); } else {
      this.props.setNoFieldsEmpty(true);
    }
  }

  createRoomsArray = () => {
    let roomsArray;
    const usedRooms = [];
    let flag;
    if (this.props.hotelDetails.rooms) {
      roomsArray = this.props.hotelDetails.rooms.map((room, i) => {
        flag = 1;
        usedRooms.forEach((type) => {
          if (type === room.description[0]) {
            flag = 0;
          }
        });
        if (flag === 1) {
          usedRooms.push(room.description[0]);
          if (room.booking_id === this.props.currentId) {
            return (
              <Room
                type={room.description[0]}
                bookingId={room.booking_id}
                selected={1}
                updatePrice={this.updatePrice}
                hotelId={this.props.hotelDetails.hotel_code}
              />
            );
          }
          return (
            <Room
              type={room.description[0]}
              bookingId={room.booking_id}
              selected={0}
              updatePrice={this.updatePrice}
              hotelId={this.props.hotelDetails.hotel_code}
            />
          );
        }
      });
      // console.log('The buttons are: ', buttons);
    }
    return roomsArray;
  }
  renderCardList=() => (
    <ul className="credit-card-list clearfix">
      <li><i data-brand="visa" className="Visa" /></li>
      <li><i data-brand="amex" className="Amex" /></li>
      <li><i data-brand="mastercard" className="Mastercard" /></li>
      <li><i data-brand="jcb" className="Jcb" /></li>
      <li><i data-brand="discover" className="Discover" /></li>
      <li><i data-brand="dinersclub" className="Diners-club" /></li>
    </ul>)
  render() {
    const roomsArray = this.createRoomsArray();
    return (
      <div className="PaymentForm">
        <div className="RoomDetailsSection">
    Room type
          <div className="RoomType">
          {roomsArray}
          </div>
        </div>
        <div className="CredidCardDetailsForm">
        Payment Details
          <div className="CreditCard">
            <div className="CardNumberWithImage">
              <input type="text" ref="number" placeholder="Card Number" className="CardNumberInputField" onChange={event => this.getCardType(event)} />
              <img className="CreditCardImage" src={this.state.imgSrc} alt="" />
            </div>
            <input type="text" placeholder="Card Holder Name" onChange={event => this.handleCardHolderName(event)} className="CardHolderNameInputField" />
            <div className="ExpiryAndCvv">
              <input type="text" ref="expiration" onChange={event => this.handleExpiration(event)} placeholder="Expiry" className="ExpiryInputField" />
              <input type="password" ref="cvc" onChange={event => this.handleCvv(event)} placeholder="CVV" className="CvvInputField" />
            </div>
            {/* { this.renderCardList() } */}
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  roomsArray: state.manageRooms.roomsArrayOfSelectedHotel,
  currentId: state.manageRooms.currentRoomId,
  hotelDetails: state.manageRooms.hotelDetails,

});
CreditCard.propTypes = {};
export default connect(mapStateToProps, null)(CreditCard);
CreditCard.propTypes = {
  setNoFieldsEmpty: PropTypes.func.isRequired,
};
