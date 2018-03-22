import React from 'react';
import PropTypes from 'prop-types';
import './StarsFilter.css';
import StarsFilterItem from '../StarsFilterItem';

class StarsFilter extends React.Component {
  render() {
    const starsItems = [];
    for (let i = 1; i < 6; i += 1) {
      starsItems.push(<StarsFilterItem number={i} selected={this.props.starsFilter[i]} updateFilteredHotels={this.props.updateFilteredHotels} />);
    }
    return (
      <div className="stars-filter">
        {starsItems}
      </div>
    );
  }
}
StarsFilter.defaultProps = {
};
StarsFilter.propTypes = {
  starsFilter: PropTypes.object.isRequired,
  updateFilteredHotels: PropTypes.func.isRequired,
};
export default StarsFilter;
