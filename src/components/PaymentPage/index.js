import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import './PaymentPage.css';
import Header from '../Header';
import { logout, changeLoginState, setRoomTypeUneditable } from '../../redux/actions';
import BookingSummary from '../BookingSummary';
import FooterBlack from '../FooterBlack';
import PaymentForm from '../PaymentForm';

window.onbeforeunload = function () {
  window.localStorage.setItem('refresh', true);
};
class PaymentPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAnyFieldEmpty: true,
    };
  }
  componentWillMount() {
    console.log('in LandingPage componentWillMount, window.localStorage.getItem(userName)', window.localStorage.getItem('userName'), typeof (window.localStorage.getItem('userName')));
    if (window.localStorage.getItem('userName') !== null) {
      // console.log('hi');
      this.props.changeLoginState(window.localStorage.getItem('userName'));
    }
    this.props.setRoomTypeUneditable();
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
  setNoFieldsEmpty=(value) => {
    console.log('setNoFieldsEmpty called with', value);
    this.setState({
      isAnyFieldEmpty: value,
    });
  }
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
    if (window.localStorage.getItem('refresh') === 'true') {
      return <Redirect to="/" />;
    }
    // if (this.props.rooms[this.props.currentId] === undefined) {
    //   return <Redirect to="/" />;
    // }
    if (window.localStorage.getItem('token') !== null) {
      return (
        <div className="PaymentPage">
          <div className="PaymentHeader">
            <Header
              isLoggedIn={this.props.isLoggedIn}
              logoutHandler={this.logoutHandler}
              firstName={this.props.firstName}
              profileButtonClass="profileButtonBlack"
              logoGreen
            />
          </div>
          <div className="PaymentBody">
            <PaymentForm setNoFieldsEmpty={value => this.setNoFieldsEmpty(value)} />
            <BookingSummary isAnyFieldEmpty={this.state.isAnyFieldEmpty} />
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
  setRoomTypeUneditable: () => {
    dispatch(setRoomTypeUneditable());
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
  setRoomTypeUneditable: PropTypes.func.isRequired,
};
