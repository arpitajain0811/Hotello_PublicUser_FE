import React from 'react';
import Payment from 'payment';
import './PaymentForm.css';
// import { Row, Col, FormGroup, ControlLabel, Button, Alert } from 'react-bootstrap';
// import { Bert } from 'meteor/themeteorchef:bert';

class CreditCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imgSrc: '',
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
    }
    if (type === 'visa') {
      this.setState({
        imgSrc: '/visa.png',
      });
    }
    if (type === 'amex') {
      this.setState({
        imgSrc: '/amex.png',
      });
    }
    if (type === 'jcb') {
      this.setState({
        imgSrc: '/jcb.png',
      });
    }
    if (type === 'dinersclub') {
      this.setState({
        imgSrc: '/dinersclub.png',
      });
    }
    if (type === 'discover') {
      this.setState({
        imgSrc: '/discover.png',
      });
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
          <div className="RoomTypesContainer">
            <div className="RoomType">
              <div>   <img src="/male.svg" className="maleIcon" alt="" /></div>
              <div>  Single Bed - standard</div>
            </div>
            <div className="RoomType Roomtype2">
    Double Bed - standard
            </div>
            <div className="RoomType">
    Double Bed - Deluxe
            </div>
          </div>
        </div>
        <div className="CredidCardDetailsForm">
        Payment Details
          <div className="CreditCard">
            <div className="CardNumberWithImage">
              <input type="text" ref="number" placeholder="Card Number" className="CardNumberInputField" onChange={event => this.getCardType(event)} />
              <img className="CreditCardImage" src={this.state.imgSrc} alt="" />
            </div>
            <input type="text" placeholder="Card Holder Name" className="CardHolderNameInputField" />
            <div className="ExpiryAndCvv">
              <input type="text" ref="expiration" placeholder="Expiry" className="ExpiryInputField" />
              <input type="text" ref="cvc" placeholder="CVV" className="CvvInputField" />
            </div>
            {/* { this.renderCardList() } */}
          </div>
        </div>
      </div>
    );
  }
}

CreditCard.propTypes = {};
export default CreditCard;
