import React from 'react';
import PropTypes from 'prop-types';
import './StarsFilter.css';
import StarsFilterItem from '../StarsFilterItem';

class StarsFilter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedStars: [],
    };
  }
  render() {
    const starsItems = [];
    for (let i = 1; i < 6; i += 1) {
      starsItems.push(<StarsFilterItem number={i} />);
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
};
export default StarsFilter;
