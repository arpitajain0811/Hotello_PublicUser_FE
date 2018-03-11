import React from 'react';
import './LandingPage.css';
import LandingPageBody from '../LandingPageBody';
import Header from '../Header';
import Footer from '../Footer';

class LandingPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="landingPage">
        <Header />
        <LandingPageBody />
        <Footer />
      </div>
    );
  }
}

export default LandingPage;

