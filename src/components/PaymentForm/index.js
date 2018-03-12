import React from 'react';
import Payment from 'payment';
// import { Row, Col, FormGroup, ControlLabel, Button, Alert } from 'react-bootstrap';
// import { Bert } from 'meteor/themeteorchef:bert';

class CreditCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      number: null,
      exp_month: null,
      exp_year: null,
      cvc: null,
      token: null,
    };
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
        Payment Details

        <div className="CreditCard">
          <input type="text" placeholder="Card Number" className="CardNumberInputField" />
          <input type="text" placeholder="Card Holder Name" className="CardHolderNameInputField" />
          <input type="text" placeholder="Expiry" className="ExpiryInputField" />
          <input type="text" placeholder="CVV" className="CvvInputField" />
          {/* { this.renderCardList() } */}
        </div>
      </div>
    );
  }
}

CreditCard.propTypes = {};
export default CreditCard;
