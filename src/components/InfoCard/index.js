import React from 'react';
import PropTypes from 'prop-types';
import AnimateOnChange from 'react-animate-on-change';
import { Link } from 'react-router-dom';
import './InfoCard.css';


class InfoCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hidden: '',
      diff: true,
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.name !== this.props.name) {
      this.setState({ hidden: '', diff: true });
    } else {
      this.setState({ hidden: '', diff: false });
    }
  }

  render() {
    const stars = [];
    for (let i = 0; i < Number(this.props.stars); i += 1) {
      stars.push((<img
        src="/star-white.svg"
        className="star"
        alt="star"
        key={i}
      />));
    }
    for (let i = 0; i < (5 - Number(this.props.stars)); i += 1) {
      stars.push((<img
        src="/star-grey.svg"
        className="star-grey"
        alt="star-grey"
        key={Number(this.props.stars) + i}
      />));
    }
    const nearbyArr = [];
    this.props.nearby.forEach((element) => {
      const nearbyElement = (
    <div className="nearby-element" >
      <img src={element.icon} alt="icon" className="nearby-element-icon" />
      <div className="nearby-element-text">
        <span>{element.name}</span>
        <span>{`${element.distance} km.`}</span>
      </div>
    </div>);
      nearbyArr.push(nearbyElement);
    });


    return (
      <AnimateOnChange
        baseClassName={`info-card${this.state.hidden}`}
        animationClassName="fadein"
        animate={this.state.diff}
      >
        <div className="info-card-hide-btn-row" >
        <span className="info-card-hide-btn" onClick={() => { this.setState({ hidden: ' hide' }); }}>x</span>
        </div>
        <div className="info-card-head">
          <div className="info-card-name">
            {this.props.name}
            <span className="info-card-stars">{this.props.stars} {stars}</span>
          </div>
          <Link to={`/detailsPage/${this.props.hotelId}`} className="info-card-link">
          <button className="info-card-btn">Book</button>
          </Link>
        </div>
        <div className="info-card-desc">
          <div className="info-card-desc-section">
            <span className="info-card-desc-title">Address:</span>
            {this.props.location.address}
          </div>
          <div className="info-card-desc-section">
            <span className="info-card-desc-title">Nearby transit points:</span>
            {nearbyArr}
          </div>
        </div>
      </AnimateOnChange>);
  }
}
InfoCard.defaultProps = {
};
InfoCard.propTypes = {
  name: PropTypes.string.isRequired,
  stars: PropTypes.string.isRequired,
  nearby: PropTypes.arrayOf(Object).isRequired,
};
export default InfoCard;
