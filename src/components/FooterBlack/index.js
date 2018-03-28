import React from 'react';
import { Link } from 'react-router-dom';
import './FooterBlack.css';

function FooterBlack() {
  return (
    <div className="footerBlack">
      <div className="footerBlackItem1">
        <div className="blackLine" />
        <div className="footerBlackItem1LinksContainer" >
          <Link to="/pageunderconstruction" className="footerBlackItem1Link">
            <div >
             About
            </div>
          </Link>
          <Link to="/pageunderconstruction" className="footerBlackItem1Link">
            <div >
            Blog
            </div>
          </Link>
          <Link to="/pageunderconstruction" className="footerBlackItem1Link">
            <div >
            Contact
            </div>
          </Link>
        </div>
      </div>
      <div className="footerBlackItem2">
        <Link to="/pageunderconstruction" className="footerBlackItem2Link" >
            Legal Notice
        </Link>
        <Link to="/pageunderconstruction" className="footerBlackItem2Link" >
            Privacy policy
        </Link>
      </div>
    </div>
  );
}

export default FooterBlack;

