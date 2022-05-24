/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import { PropTypes } from 'prop-types';

function Input(props) {
  const {
    labelText,
    placeholder,
    type,
    required,
    value,
    id,
    handleInputChange,
  } = props;
  return (
    // eslint-disable-next-line jsx-a11y/label-has-associated-control
    <label className={type}>
      {labelText}
      <input
        type={type}
        placeholder={placeholder}
        required={required}
        id={id}
        value={value}
        onChange={handleInputChange}
      />
    </label>
  );
}

Input.propTypes = {
  labelText: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  type: PropTypes.string.isRequired,
  required: PropTypes.bool.isRequired,
  value: PropTypes.string,
  id: PropTypes.string.isRequired,
  handleInputChange: PropTypes.func.isRequired,
};
Input.defaultProps = {
  value: '',
  placeholder: 'Enter new value',
};

export default Input;
