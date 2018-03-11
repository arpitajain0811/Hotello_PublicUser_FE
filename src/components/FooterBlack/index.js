import React from 'react';
import { Link } from 'react-router-dom';
import './FooterBlack.css';

function FooterBlack(props) {
  return (
    <div className="footerBlack">
      <div className="footerBlackItem1">
        <div className="blackLine" />
        <div className="footerBlackItem1LinksContainer" >
          <Link to="/about" className="footerBlackItem1Link">
            <div >
             About
            </div>
          </Link>
          <Link to="/blog" className="footerBlackItem1Link">
            <div >
            Blog
            </div>
          </Link>
          <Link to="/Contact" className="footerBlackItem1Link">
            <div >
            Contact
            </div>
          </Link>
        </div>
      </div>
      <div className="footerBlackItem2">
        <Link to="/legalNotice" className="footerBlackItem2Link" >
            Legal Notice
        </Link>
        <Link to="/privacyPolicy" className="footerBlackItem2Link" >
            Privacy policy
        </Link>
      </div>
    </div>
  );
}

export default FooterBlack;

