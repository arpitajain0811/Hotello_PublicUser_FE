import React from 'react';
import './Room.css';
import single from '../../images/icons/single.svg';
import double from '../../images/icons/double.svg';
import { connect } from 'react-redux';
import { changeRoomId } from '../../redux/actions';

class Room extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bookingId: this.props.bookingId,
      style: {
        backgroundColor: '#FFFFFF',
      },
    };
  }

  componentDidMount() {
    if (this.props.selected === 1) {
      this.props.changeId(this.state.bookingId);
    }
  }
  render() {
    let imgSrc;
    if ((this.props.type.includes('double')) || (this.props.type.includes('Double')) || (this.props.type.includes('DOUBLE'))) {
      imgSrc = double;
    } else {
      imgSrc = single;
    }
    let color;
    if (this.state.bookingId === this.props.currentId) {
      color = '#CCE7C7';
    } else {
      color = '#FFFFFF';
    }
    if (this.props.selected === 2) {
      color = '#FFFFFF';
    }

    if (this.props.clickable === 1) {
      return (
        <div
          className="roomContainer"
          style={{
            backgroundColor: color,
          }}
          onClick={() => {
            this.props.changeId(this.state.bookingId);
        }}
        >
          <div className="crop">
            <img src={imgSrc} className="icon" />
          </div>
          <div className="roomDesc">{this.props.type}</div>
        </div>
      );
    }
    return (
        <div
          className="roomContainer"
          style={{
            backgroundColor: color,
          }}
        >
          <div className="crop">
            <img src={imgSrc} className="icon" />
          </div>
          <div className="roomDesc">{this.props.type}</div>
        </div>
    );
  }
}

const mapStateToProps = state => ({
  currentId: state.manageRooms.currentRoomId,
});

const mapDispatchToProps = dispatch => ({
  changeId: (bookingId) => {
    dispatch(changeRoomId(bookingId));
  },
});

Room.defaultProps = {
  clickable: 1,
};
export default connect(mapStateToProps, mapDispatchToProps)(Room);
