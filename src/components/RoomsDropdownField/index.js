import PropTypes from 'prop-types';
import React from 'react';
import './RoomsDropdownField.css';


class RoomsDropdownField extends React.Component {
  render() {
    return (
      <div className="RoomsDropdownField">
        <div className="RoomLabel"> Room {this.props.id}</div>
        <div className="AdultsInputBox">
          <select className="AdultsSelector">
            <option value="1" selected>1 Adult</option>
            <option value="2">2 Adults</option>
            <option value="3">3 Adults</option>
          </select>
        </div>
        <div className="ChildrenInputBox">
          <select className="ChildrenSelector">
            <option value="0" selected>Children</option>
            <option value="1">1 Child</option>
            <option value="2">2 Children</option>
          </select>
        </div>
        <div className={this.props.id === 1 ? 'RemoveButtonDisabled' : 'RemoveButton'} >
          <button>remove</button>
        </div>
        <div className={this.props.id === 1 ? 'Room1Label' : 'Room1LabelDisabled'} >
        (2-8 years)
        </div>
      </div>
    );
  }
}

export default RoomsDropdownField;
RoomsDropdownField.propTypes = {
//   data: PropTypes.arrayOf(PropTypes.string.isRequire1d).isRequired,
//   header: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
//   columns: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
};

