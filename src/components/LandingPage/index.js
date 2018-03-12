import React from 'react';
import { connect } from 'react-redux';
import './LandingPage.css';
import LandingPageBody from '../LandingPageBody';
import Header from '../Header';
import Footer from '../Footer';

class LandingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }


  render() {
    console.log(this.props.userName);
    return (
      <div className="landingPage">
        <Header
          toHide={this.props.userName !== '' ? { display: 'none' } : { display: 'flex' }}
          hideUserName={this.props.userName !== '' ? { display: 'block' } : { display: 'none' }}
          userName={this.props.userName}
        />
        <LandingPageBody />
        <Footer />
      </div>
    );
  }
}


const mapStateToProps = state => ({
  userName: state.userReducer.firstName,
});
export default connect(mapStateToProps, null)(LandingPage);

