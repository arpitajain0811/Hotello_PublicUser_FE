import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './RoomsDropDown.css';
import RoomsDropdownField from '../RoomsDropdownField';

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
  if (this.props.totalChildren === 1) children = '1 child,';
  else if (this.props.totalChildren > 1) {
    children = `${this.props.totalChildren} children,`;
  }
  return (
    <div className="RoomsDropdown" >
      <div className="test" onClick={() => { this.showDropdownBlock(); }}>
        <div className="RoomPeopleSelectionText"> {this.props.totalAdults} Adults, {children} {this.props.totalRooms} Room</div>
        <img className="DropdownIcon" src="/dropdownarrow.png" alt="" />
      </div>
      <div className={this.state.dropDownVisible ? 'DropDownBlock' : 'DropDownGone'} >
        {/* {dropDownFieldsHolder} */}
        <RoomsDropdownField
          id={1}
        />
        <RoomsDropdownField id={2} />
        <div className="RoomsDropdownButtons">
          <button className="AddRoomButton">ADD ROOM</button>
          <button className="ConfirmRoomsButton">CONFIRM</button>
        </div>
      </div>
    </div>
  );
}
}
const mapStateToProps = state => ({
  totalRooms: state.searchOptions.totalRooms,
  totalAdults: state.searchOptions.totalAdults,
  totalChildren: state.searchOptions.totalChildren,
});
export default connect(mapStateToProps, null)(RoomsDropdown);
RoomsDropdown.propTypes = {
  totalRooms: PropTypes.number.isRequired,
  totalAdults: PropTypes.number.isRequired,
  totalChildren: PropTypes.number.isRequired,
};
