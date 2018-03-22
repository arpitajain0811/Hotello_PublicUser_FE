import React from 'react';
import PropTypes from 'prop-types';
import './StarsFilterItem.css';

class StarsFilterItem extends React.Component {
  render() {
    console.log('selected', this.props.number, this.props.selected);
    const stars = [];
    for (let i = 0; i < this.props.number; i += 1) {
      stars.push(<img
        src={`/star${this.props.selected ? '-white' : ''}.svg`}
        className="star-grey"
        alt="star"
        key={i + 1}
      />);
    }
    return (
      <div
        className={`stars-filter-item${this.props.selected ? ' stars-filter-item-active' : ''}`}
        onClick={() => { this.props.updateFilteredHotels(null, this.props.number); }}
      >
        {stars}
      </div>
    );
  }
}
StarsFilterItem.defaultProps = {
};
StarsFilterItem.propTypes = {
  number: PropTypes.number.isRequired,
  selected: PropTypes.bool.isRequired,
  updateFilteredHotels: PropTypes.func.isRequired,
};
export default StarsFilterItem;
