import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import Header from '../Header';
import { logout, changeLoginState } from '../../redux/actions';
import PrimaryTravellerDetails from '../PrimaryTravellerDetails';
import './UserBookingDetails.css';
import FooterBlack from '../FooterBlack';

class UserBookingDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
    UserBookingDetails.propTypes = {
      isLoggedIn: PropTypes.bool.isRequired,
      firstName: PropTypes.string.isRequired,
      changeLoginState: PropTypes.func.isRequired,
      logout: PropTypes.func.isRequired,

    };
  }

  componentWillMount() {
    console.log('in LandingPage componentWillMount, window.localStorage.getItem(userName)', window.localStorage.getItem('userName'), typeof (window.localStorage.getItem('userName')));
    if (window.localStorage.getItem('userName') !== null) {
      // console.log('hi');
      this.props.changeLoginState(window.localStorage.getItem('userName'));
    }
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
    // const paxRows = [];
    // const { rooms } = this.props;
    // for (let i = 0; i < rooms.length; i += 1) {
    //   paxRows.push(<div className="UBD-Room">
    //       Room {i + 1}
    //                </div>);
    //   for (let j = 0; j < rooms[i].ADT; j += 1) {
    //     paxRows.push(<div className="UBD-AdCh-outer">
    //       <div className="UBD-AdCh">
    //         Adult {j + 1}
    //       <hr />
    //       </div>
    //       <div className="UBD-AdCh-Details">
    //         <div className="UBD-title-out">
    //           <select className="UBD-title">
    //             <option value="Mr">Mr.</option>
    //             <option value="Mrs">Mrs.</option>
    //           </select>
    //         </div>
    //         <div><input className="UBD-form-input" type="text" placeholder="First Name" /></div>
    //         <div><input className="UBD-form-input" type="text" placeholder="Last Name" /></div>
    //         <div className="DOB-label"><label>DOB</label></div>
    //         <div><input className="UBD-form-input-dob" type="date" /></div>
    //       </div>
    //                  </div>);
    //   }
    //   for (let j = 0; j < rooms[i].CHD; j += 1) {
    //     paxRows.push(<div className="UBD-AdCh-outer">
    //       <div className="UBD-AdCh">
    //         Child {j + 1}
    //       <hr />
    //       </div>
    //       <div className="UBD-AdCh-Details">
    //         <div className="UBD-title-out">
    //           <select className="UBD-title">
    //             <option value="Mr">Mr.</option>
    //             <option value="Mrs">Mrs.</option>
    //           </select>
    //         </div>
    //         <div><input className="UBD-form-input" type="text" placeholder="First Name" /></div>
    //         <div><input className="UBD-form-input" type="text" placeholder="Last Name" /></div>
    //         <div className="DOB-label"><label>DOB</label></div>
    //         <div><input className="UBD-form-input-dob" type="date" /></div>
    //       </div>
    //                  </div>);
    //   }
    // }
    if (window.localStorage.getItem('token') !== null) {
      return (
      <div className="UBD-Main">
        <div className="UBD-Header">
        <Header
          isLoggedIn={this.props.isLoggedIn}
          logoutHandler={this.logoutHandler}
          firstName={this.props.firstName}
          profileButtonClass="profileButtonBlack"
        />
        </div>
        <div className="UBD-pax-details">
          <PrimaryTravellerDetails />
        </div>
        <div className="UBD-Footer">
        <FooterBlack />
        </div>
      </div>
      );
    }

    return null;
  }
}

const mapDispatchToProps = dispatch => ({
  logout: () => { dispatch.logout(); },
  changeLoginState: (firstName) => { dispatch(changeLoginState(firstName)); },
});

const mapStateToProps = state => ({
  userName: state.userReducer.firstName,
  isLoggedIn: state.userReducer.isLoggedIn,
  firstName: state.userReducer.firstName,
  // rooms: state.searchOptions.rooms,
});

export default connect(mapStateToProps, mapDispatchToProps)(UserBookingDetails);

