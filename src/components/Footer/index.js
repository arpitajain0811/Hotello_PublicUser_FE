import React from 'react';
import './Footer.css';

function Footer(props) {
  return (
    <div className="footer">
      <div className="footerItem1">
        <div className="whiteLine" />
        <div className="footerItem1LinksContainer" >
          <div className="footerItem1Link" >
            About
          </div>
          <div className="footerItem1Link" >
            Blog
          </div>
          <div className="footerItem1Link" >
            Contact
          </div>
        </div>
      </div>
      <div className="footerItem2">
        <div className="footerItem2Link" >
            Legal Notice
        </div>
        <div className="footerItem2Link" >
            Privacy policy
        </div>
      </div>
    </div>
  );
}

export default Footer;

