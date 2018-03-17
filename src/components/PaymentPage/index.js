import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './PaymentPage.css';
import Header from '../Header';
import BookingSummary from '../BookingSummary';
import FooterBlack from '../FooterBlack';
import PaymentForm from '../PaymentForm';

class PaymentPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loginState: {
        isLoggedIn: false,
        firstName: '',
      },
    };
  }

  componentWillMount() {
    console.log('in LandingPage componentWillMount, window.localStorage.getItem(userName)', window.localStorage.getItem('userName'), typeof (window.localStorage.getItem('userName')));
    if (window.localStorage.getItem('userName') !== null) {
      this.setState({
        loginState: {
          isLoggedIn: true,
          firstName: window.localStorage.getItem('userName'),
        },
      });
    } else {
      this.setState({
        loginState: {
          isLoggedIn: false,
          firstName: '',
        },
      });
    }
  }

  logoutHandler = () => {
    console.log('in LandingPage logoutHandler');
    this.setState({
      loginState: {
        isLoggedIn: false,
        firstName: '',
      },
    });
  }

  render() {
    // console.log(this.props.userName);
    return (
      <div className="PaymentPage">
        <Header
          loginState={this.state.loginState}
          logoutHandler={this.logoutHandler}
          profileButtonClass="profileButtonBlack"
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
