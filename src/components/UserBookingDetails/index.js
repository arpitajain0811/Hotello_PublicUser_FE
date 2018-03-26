import React from 'react';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from '../Header';
import { logout, changeLoginState, userBookingDetails } from '../../redux/actions';
// import PrimaryTravellerDetails from '../PrimaryTravellerDetails';
import './UserBookingDetails.css';
import FooterBlack from '../FooterBlack';

class UserBookingDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bookDetails: {
        bookBasket: [],
        address: {
          addressLine1: '',
          addressLine2: '',
          addressLine3: '',
          cityName: '',
          zipCode: '',
          countryCode: '',
          province: '',
        },
        email: '',
        firstName: '',
        lastName: '',
        phoneNumber: 0,
        persons: {
          namePrefix: 'Mr',
          firstName: '',
          lastName: '',
          birthDate: '1997-03-21',
          room_index: 0,
          passengerTypeCode: 'ADT',
          baggage: '0',
        },
        amount: this.props.rooms[this.props.currentId].price.total.toString(),
        hotelname: this.props.hotelname,
        checkin: this.props.checkin,
        checkout: this.props.checkout,
        city: this.props.city,
      },
    };

    UserBookingDetails.propTypes = {
      isLoggedIn: PropTypes.bool.isRequired,
      firstName: PropTypes.string.isRequired,
      changeLoginState: PropTypes.func.isRequired,
      logout: PropTypes.func.isRequired,
      userBookingDetails: PropTypes.func.isRequired,
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

  changeTitle = (event) => {
    this.setState({
      ...this.state,
      bookDetails: {
        ...this.state.bookDetails,
        persons: {
          ...this.state.bookDetails.persons,
          namePrefix: event.target.value,
        },
      },
    });
  }

  changeFirstName = (event) => {
    this.setState({
      ...this.state,
      bookDetails: {
        ...this.state.bookDetails,
        firstName: event.target.value,
        persons: {
          ...this.state.bookDetails.persons,
          firstName: event.target.value,
        },
      },
    });
  }

  changeLastName = (event) => {
    this.setState({
      ...this.state,
      bookDetails: {
        ...this.state.bookDetails,
        lastName: event.target.value,
        persons: {
          ...this.state.bookDetails.persons,
          lastName: event.target.value,
        },
      },
    });
  }

  changeEmail = (event) => {
    this.setState({
      ...this.state,
      bookDetails: {
        ...this.state.bookDetails,
        email: event.target.value,
      },
    });
  }

  changePhone = (event) => {
    this.setState({
      ...this.state,
      bookDetails: {
        ...this.state.bookDetails,
        phoneNumber: event.target.value,
      },
    });
  }

  changeAdd1 = (event) => {
    this.setState({
      ...this.state,
      bookDetails: {
        ...this.state.bookDetails,
        address: {
          ...this.state.bookDetails.address,
          addressLine1: event.target.value,
        },
      },
    });
  }

  changeAdd2 = (event) => {
    this.setState({
      ...this.state,
      bookDetails: {
        ...this.state.bookDetails,
        address: {
          ...this.state.bookDetails.address,
          addressLine2: event.target.value,
        },
      },
    });
  }

  changeAdd3 = (event) => {
    this.setState({
      ...this.state,
      bookDetails: {
        ...this.state.bookDetails,
        address: {
          ...this.state.bookDetails.address,
          addressLine3: event.target.value,
        },
      },
    });
  }

  changeCity = (event) => {
    this.setState({
      ...this.state,
      bookDetails: {
        ...this.state.bookDetails,
        address: {
          ...this.state.bookDetails.address,
          cityName: event.target.value,
        },
      },
    });
  }

  changeZip = (event) => {
    this.setState({
      ...this.state,
      bookDetails: {
        ...this.state.bookDetails,
        address: {
          ...this.state.bookDetails.address,
          zipCode: event.target.value,
        },
      },
    });
  }

  changeCountry = (event) => {
    this.setState({
      ...this.state,
      bookDetails: {
        ...this.state.bookDetails,
        address: {
          ...this.state.bookDetails.address,
          countryCode: event.target.value,
        },
      },
    });
  }

  changeProvince = (event) => {
    this.setState({
      ...this.state,
      bookDetails: {
        ...this.state.bookDetails,
        address: {
          ...this.state.bookDetails.address,
          province: event.target.value,
        },
      },
    });
  }

  saveDetails = () => {
    this.props.userBookingDetails(this.state.bookDetails);
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
          logoGreen
        />
        </div>
        <div className="UBD-pax-details">
        <div className="PTD-outer">
        <div className="PTD-head">
            Primary Traveller Details
            <hr />
        </div>
        <div className="PTD-form">
        <div className="PTD-form-fields">
            <div className="PTD-inp PTD-title-div">
              <select className="PTD-form-input PTD-title" onChange={(event) => { this.changeTitle(event); }}>
            <option className="PTD-title" value="Mr">Mr.</option>
            <option className="PTD-title" value="Ms">Ms.</option>
            <option className="PTD-title" value="Mrs">Mrs.</option>
              </select>
            </div>
            <div className="PTD-inp"><input className="PTD-form-empty" type="text" disabled /></div>
        </div>
          <div className="PTD-form-fields">
            <div className="PTD-inp"><input onChange={(event) => { this.changeFirstName(event); }} className="PTD-form-input" type="text" placeholder="First Name" /></div>
            <div className="PTD-inp"><input onChange={(event) => { this.changeLastName(event); }} className="PTD-form-input" type="text" placeholder="Last Name" /></div>
          </div>
          <div className="PTD-form-fields">
            <div className="PTD-inp"><input onChange={(event) => { this.changeEmail(event); }} className="PTD-form-input" type="email" placeholder="Email" /></div>
            <div className="PTD-inp"><input onChange={(event) => { this.changePhone(event); }} className="PTD-form-input" type="number" placeholder="Mobile No." /></div>
          </div>
          <div className="PTD-form-fields">
            <div className="PTD-inp"><input onChange={(event) => { this.changeAdd1(event); }} className="PTD-form-input" type="text" placeholder="Address Line 1" /></div>
            <div className="PTD-inp"><input onChange={(event) => { this.changeCity(event); }} className="PTD-form-input" type="text" placeholder="City" /></div>
          </div>
          <div className="PTD-form-fields">
            <div className="PTD-inp"><input onChange={(event) => { this.changeAdd2(event); }} className="PTD-form-input" type="text" placeholder="Address Line 2" /></div>
            <div className="PTD-inp PTD-inpx2">
              <div className="PTD-inp"><input onChange={(event) => { this.changeZip(event); }} className="PTD-form-input2" type="number" placeholder="Zip" /></div>
              <div className="PTD-inp"><input onChange={(event) => { this.changeCountry(event); }} className="PTD-form-input2" type="text" placeholder="Country Code" /></div>
            </div>
          </div>
          <div className="PTD-form-fields">
            <div className="PTD-inp"><input onChange={(event) => { this.changeAdd3(event); }} className="PTD-form-input" type="text" placeholder="Address Line 3" /></div>
            <div className="PTD-inp"><input onChange={(event) => { this.changeProvince(event); }} className="PTD-form-input" type="text" placeholder="Province" /></div>
          </div>
        </div>
        </div>
        </div>
        <Link to="/payment" className="UBD-btn-div">
          <button onClick={() => { this.saveDetails(); }} className="UBD-btn">Continue</button>
        </Link>
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
  logout: () => { dispatch(logout()); },
  changeLoginState: (firstName) => { dispatch(changeLoginState(firstName)); },
  userBookingDetails: (bookDetails) => { dispatch(userBookingDetails(bookDetails)); },
});

const mapStateToProps = state => ({
  userName: state.userReducer.firstName,
  isLoggedIn: state.userReducer.isLoggedIn,
  firstName: state.userReducer.firstName,
  currentId: state.manageRooms.currentRoomId,
  rooms: state.manageRooms.rooms,
  hotelname: state.manageRooms.hotelDetails.hotel_name,
  checkin: state.searchOptions.checkInDate,
  checkout: state.searchOptions.checkOutDate,
  city: state.searchOptions.city,
  // rooms: state.searchOptions.rooms,
});

export default connect(mapStateToProps, mapDispatchToProps)(UserBookingDetails);
