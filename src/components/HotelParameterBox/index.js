import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import { connect } from 'react-redux';
import Slider from 'react-slider';
import './HotelParameterBox.css';
import RoomsDropDown from '../RoomsDropDown';
import { setCheckInDate, setCheckOutDate } from '../../redux/actions';
import SliderPrice from '../SliderPrice';
import StarsFilter from '../StarsFilter';

class HotelParameterBox extends React.Component {
  verifyCheckinDate=(date) => {
    if (date >= moment(new Date())) { this.props.changeCheckinDate(date); }
  }
  verifyCheckoutDate=(date) => {
    if (date >= this.props.checkInDate) { this.props.changeCheckoutDate(date); }
  }

  render() {
    return (
      <div className="hotelParameterBox" >
        <div className="DatesDiv">
          <div className="DatePicker">
            <DatePicker
              className="greenify"
              selected={moment(this.props.checkInDate)}
              onChange={date => this.verifyCheckinDate(date)}
            />
          </div>
          <div className="Arrow">
            <img className="ArrowImg" src="/arrow.png" alt="" />
          </div>
          <div className="DatePicker">
            <DatePicker
              className="greenify"
              selected={moment(this.props.checkOutDate)}
              onChange={date => this.verifyCheckoutDate(date)}
            />
          </div>
        </div>
        <div className="RoomsDiv">
          <RoomsDropDown borderClass="GiveBorder" showDropdownBlock={() => this.showDropdownBlock} />
        </div>
        <div className="filter-row">
        <div className="filter-icon-div">
          <img src="/filter.svg" alt="filter" className="filter-icon" />
        </div>
          <div className="slider-row">
          Price:
            <SliderPrice price={this.props.priceFilter[0]} />
            <Slider
              min={1000}
              max={20000}
              defaultValue={[5000, 17000]}
              withBars
              onAfterChange={(v) => {
                this.props.updateFilteredHotels(v, null);
          }}
            />
            <SliderPrice price={this.props.priceFilter[1]} />
          </div>
          <StarsFilter
            updateFilteredHotels={this.props.updateFilteredHotels}
            starsFilter={this.props.starsFilter}
          />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  changeCheckinDate: (date) => {
    dispatch(setCheckInDate(date));
  },
  changeCheckoutDate: (date) => {
    dispatch(setCheckOutDate(date));
  },
});
const mapStateToProps = state => ({
  checkInDate: state.searchOptions.checkInDate,
  checkOutDate: state.searchOptions.checkOutDate,
});
export default connect(mapStateToProps, mapDispatchToProps)(HotelParameterBox);
HotelParameterBox.propTypes = {
  checkInDate: PropTypes.objectOf.isRequired,
  checkOutDate: PropTypes.objectOf.isRequired,
  changeCheckinDate: PropTypes.func.isRequired,
  changeCheckoutDate: PropTypes.func.isRequired,
  priceFilter: PropTypes.arrayOf(Number).isRequired,
  updateFilteredHotels: PropTypes.func.isRequired,
  starsFilter: PropTypes.object.isRequired,
};
