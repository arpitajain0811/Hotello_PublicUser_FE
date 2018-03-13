import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './PaymentPage.css';
import Header from '../Header';
import BookingSummary from '../BookingSummary';
import FooterBlack from '../FooterBlack';
import PaymentForm from '../PaymentForm';

class PaymentPage extends React.Component {
  render() {
    // console.log(this.props.userName);
    return (
      <div className="PaymentPage">
        <Header
          toHide={this.props.userName !== '' ? { display: 'none' } : { display: 'flex' }}
          hideUserName={this.props.userName !== '' ? { display: 'block' } : { display: 'none' }}
          userName={this.props.userName}
        />
        <div className="PaymentBody">
          <PaymentForm />
          <BookingSummary />
        </div>
        <FooterBlack />
      </div>
    );
  }
}


const mapStateToProps = state => ({
  userName: state.userReducer.firstName,
});
export default connect(mapStateToProps, null)(PaymentPage);

PaymentPage.propTypes = {
  userName: PropTypes.string.isRequired,
};
