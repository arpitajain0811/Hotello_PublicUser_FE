import React from 'react';
import PropTypes from 'prop-types';
import AnimateOnChange from 'react-animate-on-change';
import './InfoCard.css';


class InfoCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hidden: '',
      diff: false,
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
      const nearbyElement = <div className="nearby-element" ><img src={element.icon} alt="icon" className="nearby-element-icon" /> {element.name} </div>;
      nearbyArr.push(nearbyElement);
    });


    return (
      <AnimateOnChange
        baseClassName={`info-card${this.state.hidden}`}
        animationClassName="fadein"
        animate={this.state.diff}
      >
        <div className="info-card-hide-btn" onClick={() => { this.setState({ hidden: ' hide' }); }}>x</div>
        <div className="info-card-head">
          <div className="info-card-name">
            {this.props.name}
            <span className="info-card-stars">{this.props.stars} {stars}</span>
          </div>
          <button className="info-card-btn">Book</button>

        </div>
        <div className="info-card-desc">
          {nearbyArr}
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
