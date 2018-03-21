import React from 'react';
import Popup from 'reactjs-popup';
import PropTypes from 'prop-types';
import SignUpBody from '../SignUpPage';
import LoginBody from '../LoginBody';
import './HeaderLinks.css';

class HeaderLinks extends React.Component {
  render() {
    return (
      <div className="headerLinksContainer">
        <Popup trigger={<button className={this.props.changeColor === 'true' ? 'headerLinkBlack' : 'headerLink'}> SIGN UP </button>} modal>
          {close => (
            <div className="modal">
              <a className="close" onClick={close}>
          &times;
              </a>
              <div className="SignUpHeader"> Sign Up </div>
              <div className="content">
                <SignUpBody closeFunc={() => close()} />
              </div>
              {/* <div className="actions">
                <button
                  className="button"
                  onClick={() => {
              console.log('modal closed ');
              close();
            }}
                >
            close modal
                </button>
              </div> */}
            </div>
    )}
        </Popup>
        <Popup trigger={<button className={this.props.changeColor === 'true' ? 'headerLinkBlack' : 'headerLink'}> SIGN IN </button>} modal>
          {close => (
            <div className="modal">
              <a className="close" onClick={close}>
          &times;
              </a>
              <div className="SignUpHeader"> Sign In </div>
              <div className="content">
                <LoginBody closeFunc={() => close()} />
              </div>
            </div>
    )}
        </Popup>
      </div>
    );
  }
}

export default HeaderLinks;
HeaderLinks.propTypes = {
  changeColor: PropTypes.bool.isRequired,
};
