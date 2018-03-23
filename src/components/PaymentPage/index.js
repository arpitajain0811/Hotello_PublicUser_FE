import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './PaymentPage.css';
import Header from '../Header';
import { logout, changeLoginState } from '../../redux/actions';
import BookingSummary from '../BookingSummary';
import FooterBlack from '../FooterBlack';
import PaymentForm from '../PaymentForm';

class PaymentPage extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     loginState: {
  //       isLoggedIn: false,
  //       firstName: '',
  //     },
  //   };
  // }
  componentWillMount() {
    console.log('in LandingPage componentWillMount, window.localStorage.getItem(userName)', window.localStorage.getItem('userName'), typeof (window.localStorage.getItem('userName')));
    if (window.localStorage.getItem('userName') !== null) {
      // console.log('hi');
      this.props.changeLoginState(window.localStorage.getItem('userName'));
    }
  }
  // componentWillMount() {
  //   console.log('in LandingPage componentWillMount, window.localStorage.getItem(userName)',
  //   window.localStorage.getItem('userName'), typeof (window.localStorage.getItem('userName')));
  //   if (window.localStorage.getItem('userName') !== null) {
  //     this.setState({
  //       loginState: {
  //         isLoggedIn: true,
  //         firstName: window.localStorage.getItem('userName'),
  //       },
  //     });
  //   } else {
  //     this.setState({
  //       loginState: {
  //         isLoggedIn: false,
  //         firstName: '',
  //       },
  //     });
  //   }
  // }

  logoutHandler = () => {
    console.log('in LandingPage logoutHandler');
    // this.setState({
    //   loginState: {
    //     isLoggedIn: false,
    //     firstName: '',
    //   },
    // });
    this.props.logout();
  }

  render() {
    if (window.localStorage.getItem('token') !== null) {
      return (
        <div className="PaymentPage">
          <div className="PaymentHeader">
            <Header
              isLoggedIn={this.props.isLoggedIn}
              logoutHandler={this.logoutHandler}
              firstName={this.props.firstName}
              profileButtonClass="profileButtonBlack"
              logoGreen={true}
            />
          </div>
          <div className="PaymentBody">
            <PaymentForm />
            <BookingSummary />
          </div>
          <div className="PaymentFooter">
            <FooterBlack />
          </div>
        </div>
      );
    }

    return null;
  }
}

const mapDispatchToProps = dispatch => ({
  logout: () => {
    dispatch(logout());
  },
  changeLoginState: (firstName) => {
    dispatch(changeLoginState(firstName));
  },
});

const mapStateToProps = state => ({
  userName: state.userReducer.firstName,
  firstName: state.userReducer.firstName,
  isLoggedIn: state.userReducer.isLoggedIn,
});
export default connect(mapStateToProps, mapDispatchToProps)(PaymentPage);

PaymentPage.propTypes = {
  firstName: PropTypes.string.isRequired,
  logout: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.func.isRequired,
  changeLoginState: PropTypes.func.isRequired,
};
