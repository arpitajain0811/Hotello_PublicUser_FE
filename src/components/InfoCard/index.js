import React from 'react';
import PropTypes from 'prop-types';
import './InfoCard.css';
import AnimateOnChange from 'react-animate-on-change';


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
    return (
      <AnimateOnChange
        baseClassName={`info-card${this.state.hidden}`}
        animationClassName="fadein"
        animate={this.state.diff}
      >
        <div className="info-card-name">{this.props.name}</div>
        <div className="info-card-desc">{this.props.desc}</div>
        <div onClick={() => { this.setState({ hidden: ' hide' }); }}>Hide</div>
      </AnimateOnChange>);
  }
}
InfoCard.defaultProps = {
};
InfoCard.propTypes = {
};
export default InfoCard;
