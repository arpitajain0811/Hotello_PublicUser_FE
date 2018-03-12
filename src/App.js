import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import LandingPage from '../src/components/LandingPage';
import ListingPage from './components/ListingPage';
import SignUpPage from './components/SignUpPage';
import Login from './components/Login';
import PaymentPage from './components/PaymentPage';

class App extends Component {
  render() {
    return (
      <div className="App" >
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route path="/listingPage" component={ListingPage} />
          <Route path="/signUp" component={SignUpPage} />
          <Route path="/signIn" component={Login} />
          <Route path="/payment" component={PaymentPage} />
        </Switch>
      </div>
    );
  }
}

export default App;
