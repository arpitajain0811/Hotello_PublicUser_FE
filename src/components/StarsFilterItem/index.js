import React from 'react';
import PropTypes from 'prop-types';
import './StarsFilterItem.css';

class StarsFilterItem extends React.Component {
  render() {
    const stars = [];
    for (let i = 0; i < this.props.number; i += 1) {
      stars.push(<img
        src="/star.svg"
        className="star-grey"
        alt="star"
        key={i + 1}
      />);
    }
    return (
      <div className="stars-filter-item">
        {stars}
      </div>
    );
  }
}
StarsFilterItem.defaultProps = {
};
StarsFilterItem.propTypes = {
  number: PropTypes.number.isRequired,
};
export default StarsFilterItem;
