import React from 'react';
// import { PropTypes } from 'prop-types';
import './PrimaryTravellerDetails.css';

class PrimaryTravellerDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
    PrimaryTravellerDetails.propTypes = {
      // userBookingDetails: PropTypes.func.isRequired,
    };
  }
  render() {
    return (
      <div className="PTD-outer">
        <div className="PTD-head">
            Primary Traveller Details
            <hr />
        </div>
        <div className="PTD-form">
        <div className="PTD-form-fields">
            <div className="PTD-inp PTD-title-div">
              <select className="PTD-form-input PTD-title">
            <option value="Mr">Mr.</option>
            <option value="Mrs">Mrs.</option>
              </select>
            </div>
            <div className="PTD-inp"><input className="PTD-form-empty" type="text" /></div>
        </div>
          <div className="PTD-form-fields">
            <div className="PTD-inp"><input className="PTD-form-input" type="text" placeholder="First Name" /></div>
            <div className="PTD-inp"><input className="PTD-form-input" type="text" placeholder="Last Name" /></div>
          </div>
          <div className="PTD-form-fields">
            <div className="PTD-inp"><input className="PTD-form-input" type="email" placeholder="Email" /></div>
            <div className="PTD-inp"><input className="PTD-form-input" type="number" placeholder="Mobile No." /></div>
          </div>
          <div className="PTD-form-fields">
            <div className="PTD-inp"><input className="PTD-form-input" type="text" placeholder="Address Line 1" /></div>
            <div className="PTD-inp"><input className="PTD-form-input" type="text" placeholder="City" /></div>
          </div>
          <div className="PTD-form-fields">
            <div className="PTD-inp"><input className="PTD-form-input" type="text" placeholder="Address Line 2" /></div>
            <div className="PTD-inp PTD-inpx2">
              <div className="PTD-inp"><input className="PTD-form-input2" type="number" placeholder="Zip" /></div>
              <div className="PTD-inp"><input className="PTD-form-input2" type="text" placeholder="Country Code" /></div>
            </div>
          </div>
          <div className="PTD-form-fields">
            <div className="PTD-inp"><input className="PTD-form-input" type="text" placeholder="Address Line 3" /></div>
            <div className="PTD-inp"><input className="PTD-form-input" type="text" placeholder="Province" /></div>
          </div>
        </div>
      </div>
    );
  }
}

export default PrimaryTravellerDetails;

