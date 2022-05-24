/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import { PropTypes } from 'prop-types';
import Input from './Input';

function EditablePara(props) {
  const {
    value,
    placeholder,
    id,
    edit,
    type,
    required,
    handleInputChange,
    labelText,
    changeEdit,
  } = props;

  if (edit) {
    return (
      <div>
        <Input
          type={type}
          required={required}
          id={id}
          key={id}
          value={value}
          handleInputChange={handleInputChange}
          labelText={labelText}
          edit={edit}
        />
        <button type="button" onClick={() => changeEdit(id)}>
          Save
        </button>
      </div>
    );
  }
  return (
    <p id={id} onClick={() => changeEdit(id)}>
      <span>{labelText}:</span>
      {value || placeholder}
    </p>
  );
}

EditablePara.propTypes = {
  value: PropTypes.string,
  placeholder: PropTypes.string,
  id: PropTypes.string.isRequired,
  edit: PropTypes.bool.isRequired,
  labelText: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  required: PropTypes.bool.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  changeEdit: PropTypes.func.isRequired,
};
EditablePara.defaultProps = {
  value: '',
  placeholder: 'Enter new value',
};

export default EditablePara;
