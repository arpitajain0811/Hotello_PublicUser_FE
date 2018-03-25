import React from 'react';
import { Redirect } from 'react-router-dom';

class RedirectHome extends React.Component {
  render() {
    return (
       <Redirect to="/" />
    );
  }
}
RedirectHome.defaultProps = {
};
RedirectHome.propTypes = {
};
export default RedirectHome;
