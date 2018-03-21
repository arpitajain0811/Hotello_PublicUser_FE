import React from 'react';
import PropTypes from 'prop-types';
import './ManageUserBookingsRow.css';

class ManageUserBookingsRow extends React.Component {
    formatDate=(dateString) => {
      const d = new Date(dateString);
      const options = {
        weekday: 'short', year: 'numeric', month: 'short', day: 'numeric',
      };
      return d.toLocaleString('en-EN', options);
    }

    render() {
      return (
        <div className="manage-bookings-row">
          <div className="manage-bookings-row-img-col">
            <img src={`/placeholder-hotel-image${Number(this.props.amount)%6}.jpeg`} className="manage-bookings-row-img" alt="hotel-img" />
          </div>
          <div className="manage-bookings-row-content">

            <div className="manage-bookings-row-head">
              <div className="manage-bookings-row-hotelname">
                {this.props.hotelName}
              </div>
              <div className="manage-bookings-row-bookingid">
                Booking ID: {this.props.bookingId}
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

};
export default ManageUserBookingsRow;
