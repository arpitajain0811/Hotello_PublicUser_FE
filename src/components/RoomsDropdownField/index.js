import PropTypes from 'prop-types';
import React from 'react';
import './RoomsDropdownField.css';


class RoomsDropdownField extends React.Component {
  render() {
    return (
      <div className="RoomsDropdownField">
        <div className="RoomLabel"> Room {this.props.id}</div>
        <div className="AdultsInputBox">
          <select onChange={value => this.props.changeAdults(value.target.value, this.props.id)} className="AdultsSelector">
            <option value={1} selected>1 Adult</option>
            <option value={2}>2 Adults</option>
            <option value={3}>3 Adults</option>
          </select>
        </div>
        <div className="ChildrenInputBox">
          <select onChange={value => this.props.changeChildren(value.target.value, this.props.id)} className="ChildrenSelector">
            <option value={0} selected>Children</option>
            <option value={1}>1 Child</option>
            <option value={2}>2 Children</option>
          </select>
        </div>
        <div className={this.props.id === 1 ? 'RemoveButtonDisabled' : 'RemoveButton'} >
          <button onClick={() => this.props.removeRoom(this.props.id)}>remove</button>
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
  id: PropTypes.number.isRequired,
  changeAdults: PropTypes.func.isRequired,
  changeChildren: PropTypes.func.isRequired,
  removeRoom: PropTypes.func.isRequired,
};

