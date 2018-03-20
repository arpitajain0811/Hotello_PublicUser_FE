import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
// import { connect } from 'react-redux';
import './App.css';
import LandingPage from '../src/components/LandingPage';
import ListingPage from './components/ListingPage';
import SignUpPage from './components/SignUpPage';
import Login from './components/Login';
import DetailsPage from './components/DetailsPage';
// import SignUpPage from './components/SignUpPage';
// import { changeLoginState } from './redux/actions';
// import Login from './components/Login';
import PaymentPage from './components/PaymentPage';


class App extends Component {
  // componentDidMount() {
  //   if (window.localStorage.getItem('token') !== null) {
  //     this.props.changeLoginState(window.localStorage.getItem('userName'));
  //   }
  // }
  render() {
    return (
      <div className="App" >
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route path="/listingPage" component={ListingPage} />

          <Route path="/signUp" component={SignUpPage} />
          <Route path="/signIn" component={Login} />
          <Route path="/detailsPage/:value" component={DetailsPage} />

          {/* <Route path="/signUp" component={SignUpPage} />
          <Route path="/signIn" component={Login} /> */}
          <Route path="/payment" component={PaymentPage} />
        </Switch>
      </div>
    );
  }
}
// const mapDispatchToProps = dispatch => ({
//   changeLoginState: (status) => {
//     dispatch(changeLoginState(status));
//   },

// });
// export default connect(null, mapDispatchToProps)(App);
// App.propTypes = {
//   changeLoginState: PropTypes.func.isRequired,
// };
export default App;
