import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './RoomsDropDown.css';
import RoomsDropdownField from '../RoomsDropdownField';
import { changeAdultsInRoom, changeChildrenInRoom, removeRoom, addRoom, confirmRooms } from '../../redux/actions';

class RoomsDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dropDownVisible: false,
    };
  }
showDropdownBlock=() => {
  this.setState({
    dropDownVisible: !this.state.dropDownVisible,
  });
}
render() {
  let children = '';
  let normalClass = 'DropDownBlock';
  if (this.props.totalChildren === 1) children = '1 Child,';
  else if (this.props.totalChildren > 1) {
    children = `${this.props.totalChildren} Children,`;
  }
  const dropDownFieldsHolder = [];
  for (let i = 0; i < this.props.rooms.length; i += 1) {
    dropDownFieldsHolder.push((<RoomsDropdownField
      key={Date.now()}
      id={i + 1}
      adults={this.props.rooms[i].adults}
      childrenProp={this.props.rooms[i].children}
      changeAdults={(value, id) => this.props.changeAdults(value, id)}
      changeChildren={(value, id) => this.props.changeChildren(value, id)}
      removeRoom={id => this.props.removeRoom(id)}
    />
    ));
  }
  if (this.props.borderClass === 'GiveBorder') {
    normalClass = 'GiveBorder';
  }
  return (
    <div className="RoomsDropdown" >
      <div className="test" onClick={() => { this.showDropdownBlock(); }}>
        <div className="RoomPeopleSelectionText"> {this.props.totalAdults} Adults, {children} {this.props.totalRooms} Room</div>
        <img className="DropdownIcon" src={this.state.dropDownVisible === false ? '/dropdownarrow.png' : '/arrowUp.png'} alt="" />
      </div>
      <div className={this.state.dropDownVisible ? normalClass : 'DropDownGone'} >
        {dropDownFieldsHolder}
        <div className="RoomsDropdownButtons">
          <button onClick={() => this.props.addRoom()} className="AddRoomButton">ADD ROOM</button>
          <button onClick={() => { this.showDropdownBlock(); this.props.confirmRooms(); }} className="ConfirmRoomsButton">CONFIRM</button>
        </div>
      </div>
    </div>
  );
}
}
const mapDispatchToProps = dispatch => ({
  changeAdults: (value, id) => {
    dispatch(changeAdultsInRoom(value, id));
  },
  changeChildren: (value, id) => {
    dispatch(changeChildrenInRoom(value, id));
  },
  removeRoom: (id) => {
    dispatch(removeRoom(id));
  },
  addRoom: () => {
    dispatch(addRoom());
  },
  confirmRooms: () => {
    dispatch(confirmRooms());
  },
});
const mapStateToProps = state => ({
  totalRooms: state.searchOptions.totalRooms,
  totalAdults: state.searchOptions.totalAdults,
  totalChildren: state.searchOptions.totalChildren,
  rooms: state.searchOptions.rooms,
});
export default connect(mapStateToProps, mapDispatchToProps)(RoomsDropdown);
RoomsDropdown.propTypes = {
  totalRooms: PropTypes.number.isRequired,
  totalAdults: PropTypes.number.isRequired,
  totalChildren: PropTypes.number.isRequired,
  rooms: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  changeAdults: PropTypes.func.isRequired,
  changeChildren: PropTypes.func.isRequired,
  removeRoom: PropTypes.func.isRequired,
  addRoom: PropTypes.func.isRequired,
  confirmRooms: PropTypes.func.isRequired,
  borderClass: PropTypes.string.isRequired,
};
