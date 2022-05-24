/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import { PropTypes } from 'prop-types';

function TextArea(props) {
  const { labelText, placeholder, required, id, value, handleInputChange } =
    props;
  return (
    // eslint-disable-next-line jsx-a11y/label-has-associated-control
    <label className="textarea">
      {labelText}
      <textarea
        placeholder={placeholder}
        required={required}
        id={id}
        value={value}
        onChange={handleInputChange}
      />
    </label>
  );
}

TextArea.propTypes = {
  labelText: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  required: PropTypes.bool.isRequired,
  value: PropTypes.string,
  id: PropTypes.string.isRequired,
  handleInputChange: PropTypes.func.isRequired,
};

TextArea.defaultProps = {
  value: '',
};

export default TextArea;
