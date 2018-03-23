import React from 'react';
import { Link } from 'react-router-dom';
import './PageUnderConstruction.css';
import puc from '../../PageUnderConstruction.gif';
import logo from '../../logo.svg';

class PageUnderConstruction extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  render() {
    return (
      <div className="PUC-Main">
        <div>
          <div className="PUC-logo-container">
            <img src={logo} alt="logo" />
          </div>
          <div className="PUC-Upper">
            <img src={puc} alt="Page Under Construction" />
          </div>
          <div className="PUC-text">
              Page Under Construction!
          </div>
          <div className="PUC-btn-outer">
            <Link to="/"><button className="PUC-btn">Visit Home</button></Link>
          </div>
        </div>
      </div>
    );
  }
}

export default PageUnderConstruction;

