import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  return (
    <div className="footer">
      <div className="footerItem1">
        <div className="whiteLine" />
        <div className="footerItem1LinksContainer" >
          <Link to="/pageunderconstruction" className="footerItem1Link">
            <div >
             About
            </div>
          </Link>
          <Link to="/pageunderconstruction" className="footerItem1Link">
            <div >
            Blog
            </div>
          </Link>
          <Link to="/pageunderconstruction" className="footerItem1Link">
            <div >
            Contact
            </div>
          </Link>
        </div>
      </div>
      <div className="footerItem2">
        <Link to="/pageunderconstruction" className="footerItem2Link" >
            Legal Notice
        </Link>
        <Link to="/pageunderconstruction" className="footerItem2Link" >
            Privacy policy
        </Link>
      </div>
    </div>
  );
}

export default Footer;

