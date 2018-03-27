import React from 'react';
import PropTypes from 'prop-types';
import './ManageUserBookingsRow.css';

class ManageUserBookingsRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: this.props.status,
      confirmDialogVisible: false,
    };
  }
    cancelBooking=() => {
      const fetchOptions = {
        method: 'get',
        headers: {
          authorization: window.localStorage.getItem('token'),
          // sessionId: window.localStorage.getItem('cookie'),
        },
      };
      fetch(`/cancelBooking/${this.props.bookingId}`, fetchOptions).then(response => response.text())
        .then((respText) => {
          if (respText === 'Cancelled') {
            this.setState({ status: 'Cancelled', confirmDialogVisible: false });
          } else {
            alert('Unable to cancel. Please try again later');
            this.setState({ confirmDialogVisible: false });
          }
        });
    }

    formatDate=(dateString) => {
      const d = new Date(dateString);
      const options = {
        weekday: 'short', year: 'numeric', month: 'short', day: 'numeric',
      };
      return d.toLocaleString('en-EN', options);
    }

    render() {
      if (this.state.confirmDialogVisible) {
        return (
            <div className="manage-bookings-row-cancel-confirmation">
            Are you sure you want to cancel this booking?
            <div>
              <button className="cancel-booking-confirm-btn btn-yes" onClick={this.cancelBooking}>Yes</button>
              <button className="cancel-booking-confirm-btn" onClick={() => { this.setState({ confirmDialogVisible: false }); }}>No</button>
            </div>
            </div>
        );
      }

      return (
        <div className="manage-bookings-row">
          <div className="manage-bookings-row-img-col">
            <img src={`/placeholder-hotel-image${Number(this.props.amount % 6).toFixed(0)}.jpeg`} className="manage-bookings-row-img" alt="hotel-img" />
          </div>
          <div className="manage-bookings-row-content">

            <div className="manage-bookings-row-head">
              <div className="manage-bookings-row-head-left">
                <div className="manage-bookings-row-hotelname">
                  {this.props.hotelName}
                </div>

                <div className="manage-bookings-row-bookingid">
                  Booking ID: {this.props.bookingId}
                </div>
              </div>
              <div className="manage-bookings-row-head-right">
              {
                (this.state.status === 'Confirmed') ?
                  (new Date(this.props.checkIn) > new Date() ?
                  <button className="manage-bookings-row-cancel-btn" onClick={() => { this.setState({ confirmDialogVisible: true }); }}>Cancel</button>
                  : <div />)

              : <div className="manage-bookings-row-cancelled-pill" >Cancelled</div>
            }

              </div>
            </div>

            <div className="manage-bookings-row-foot">
              <div className="manage-bookings-row-foot-left">
                <div className="manage-bookings-row-dates">
                  {this.formatDate(this.props.checkIn)}
                  <span className="date-arrow">→</span>
                  {this.formatDate(this.props.checkOut)}
                </div>
                <div className="manage-bookings-row-guests">
                  {this.props.numOfRooms > 1 ? (`${this.props.numOfRooms} Rooms, `) : (`${this.props.numOfRooms} Room, `)}
                  {this.props.numOfGuests > 1 ? (`${this.props.numOfGuests} Guests`) : (`${this.props.numOfGuests} Guest`)}
                </div>
              </div>
              <div className="manage-bookings-row-foot-right">
            AMOUNT PAID
                <div className="manage-bookings-row-amount">
              ₹{this.props.amount}
                </div>
              </div>


            </div>


          </div>
        </div>
      );
    }
}
ManageUserBookingsRow.defaultProps = {
};
ManageUserBookingsRow.propTypes = {
  amount: PropTypes.number.isRequired,
  bookingId: PropTypes.string.isRequired,
  checkIn: PropTypes.string.isRequired,
  checkOut: PropTypes.string.isRequired,
  hotelName: PropTypes.string.isRequired,
  numOfGuests: PropTypes.number.isRequired,
  numOfRooms: PropTypes.number.isRequired,
  status: PropTypes.string.isRequired,
};
export default ManageUserBookingsRow;
