import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Payment from 'payment';
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
    return (
      <div className="PaymentForm">
        <div className="RoomDetailsSection">
    Room type
          <div className="RoomType">
          {this.props.roomsArray}
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

});
CreditCard.propTypes = {};
export default connect(mapStateToProps, null)(CreditCard);
CreditCard.propTypes = {
  roomsArray: PropTypes.array.isRequired,
  setNoFieldsEmpty: PropTypes.func.isRequired,
};
