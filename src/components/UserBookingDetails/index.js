import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import Header from '../Header';
import PrimaryTravellerDetails from '../PrimaryTravellerDetails';
import './UserBookingDetails.css';

class UserBookingDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
    UserBookingDetails.propTypes = {
      isLoggedIn: PropTypes.bool.isRequired,
      firstName: PropTypes.string.isRequired,
      rooms: PropTypes.array.isRequired,
    };
  }

  render() {
    const paxRows = [];
    const { rooms } = this.props;
    for (let i = 0; i < rooms.length; i += 1) {
      paxRows.push(<div className="UBD-Room">
          Room {i + 1}
                   </div>);
      for (let j = 0; j < rooms[i].ADT; j += 1) {
        paxRows.push(<div className="UBD-AdCh-outer">
          <div className="UBD-AdCh">
            Adult {j + 1}
          <hr />
          </div>
          <div className="UBD-AdCh-Details">
            <div className="UBD-title-out">
              <select className="UBD-title">
                <option value="Mr">Mr.</option>
                <option value="Mrs">Mrs.</option>
              </select>
            </div>
            <div><input className="UBD-form-input" type="text" placeholder="First Name" /></div>
            <div><input className="UBD-form-input" type="text" placeholder="Last Name" /></div>
            <div className="DOB-label"><label>DOB</label></div>
            <div><input className="UBD-form-input-dob" type="date" /></div>
          </div>
                     </div>);
      }
      for (let j = 0; j < rooms[i].CHD; j += 1) {
        paxRows.push(<div className="UBD-AdCh-outer">
          <div className="UBD-AdCh">
            Child {j + 1}
          <hr />
          </div>
          <div className="UBD-AdCh-Details">
            <div className="UBD-title-out">
              <select className="UBD-title">
                <option value="Mr">Mr.</option>
                <option value="Mrs">Mrs.</option>
              </select>
            </div>
            <div><input className="UBD-form-input" type="text" placeholder="First Name" /></div>
            <div><input className="UBD-form-input" type="text" placeholder="Last Name" /></div>
            <div className="DOB-label"><label>DOB</label></div>
            <div><input className="UBD-form-input-dob" type="date" /></div>
          </div>
                     </div>);
      }
    }
    return (
      <div className="UBD-Main">
        <Header
          isLoggedIn={this.props.isLoggedIn}
          firstName={this.props.firstName}
          logoutHandler={this.logoutHandler}
          textColor="white"
          profileButtonClass="profileButtonWhite"
        />
        <div className="UBD-pax-details">
          <PrimaryTravellerDetails />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  logout: () => { dispatch.logout(); },
  changeLoginState: (firstName) => { dispatch.changeLoginState(firstName); },
});

const mapStateToProps = state => ({
  isLoggedIn: state.userReducer.isLoggedIn,
  firstName: state.userReducer.firstName,
  rooms: state.searchOptions.rooms,
});

export default connect(mapStateToProps, mapDispatchToProps)(UserBookingDetails);

