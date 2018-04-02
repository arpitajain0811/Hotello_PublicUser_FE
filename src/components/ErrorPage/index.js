import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './ErrorPage.css';

class ErrorPage extends React.Component {
  render() {
    return (
       <div className="error-page">
            Sorry! An error occured. Please try again later.
            <Link className="error-page-link" to="/">
                Go to Home
            </Link>
       </div>
    );
  }
}
ErrorPage.defaultProps = {
};
ErrorPage.propTypes = {
};
export default ErrorPage;
