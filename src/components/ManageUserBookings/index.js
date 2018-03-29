import React from 'react';
import { Redirect } from 'react-router-dom';
import './ManageUserBookings.css';
import ManageUserBookingsRow from '../ManageUserBookingsRow';

class ManageUserBookings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: true,
      allBookings: [],
    };
  }
  componentDidMount() {
    const jwt = window.localStorage.getItem('token');
    const options = {
      method: 'get',
      headers: {
        authorization: jwt,
      },
    };
    fetch('/userViewBookings', options)
      .then((response) => {
        if (response.status === 401) { console.log('logininvalid'); return 'Login invalid'; }
        return response.json();
      })
      .then((respJSON) => {
        if (respJSON === 'Login invalid') {
          this.setState({ isLoggedIn: false });
          window.localStorage.setItem('token', null);
        } else {
          this.setState({ allBookings: respJSON });
        }
      });
  }
  render() {
    if (this.state.isLoggedIn === false) {
      return <Redirect to="/" />;
    }

    const allBookingRows = [];
    this.state.allBookings.forEach((booking) => {
      const bookingRow = (<ManageUserBookingsRow
        key={booking.bookingid}
        amount={booking.amount}
        bookingDate={booking.bookingdate}
        bookingId={booking.bookingid}
        checkIn={booking.checkin}
        checkOut={booking.checkout}
        hotelName={booking.hotelname}
        numOfGuests={booking.numofguests}
        numOfRooms={booking.numofrooms}
        status={booking.status}
      />);
      allBookingRows.push(bookingRow);
    });
    if (allBookingRows.length) {
      return (
        <div className="manage-user-bookings">
          {allBookingRows}
        </div>
      );
    }
    return (
      <div className="manage-user-bookings">
        <div className="messageContainer" >
          No Bookings Found
        </div>
      </div>
    );
  }
}
ManageUserBookings.defaultProps = {
};
ManageUserBookings.propTypes = {
};
export default ManageUserBookings;
