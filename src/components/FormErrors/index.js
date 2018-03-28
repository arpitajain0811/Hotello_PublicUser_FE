import React from 'react';
import PropTypes from 'prop-types';

const FormErrors = ({ formErrors }) =>
  (
    <div className="formErrors">
      {Object.keys(formErrors).map((fieldName) => {
      if (formErrors[fieldName].length > 0) {
        return (
          <p key={fieldName}> {formErrors[fieldName]}</p>
        );
      }
        return '';
    })}
    </div>);
export default FormErrors;
FormErrors.propTypes = {
  formErrors: PropTypes.func.isRequired,
};

