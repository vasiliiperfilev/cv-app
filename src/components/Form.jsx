/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import Fieldset from './Fieldset';

class Form extends Component {
  render() {
    const { fieldsets, saveData, deleteData, dataSaved } = this.props;
    return (
      <form>
        {fieldsets.map((fieldsetProps) => (
          <Fieldset
            legend={fieldsetProps.legend}
            inputs={fieldsetProps.inputs}
            dataSaved={dataSaved[fieldsetProps.legend]}
            saveData={saveData}
            deleteData={deleteData}
            key={fieldsetProps.legend}
          />
        ))}
      </form>
    );
  }
}
Form.propTypes = {
  fieldsets: PropTypes.arrayOf(
    PropTypes.shape({
      legend: PropTypes.string.isRequired,
      inputs: PropTypes.arrayOf(
        PropTypes.shape({
          component: PropTypes.elementType.isRequired,
          labelText: PropTypes.string.isRequired,
          type: PropTypes.string.isRequired,
          required: PropTypes.bool.isRequired,
          id: PropTypes.string.isRequired,
        })
      ).isRequired,
    })
  ).isRequired,
  saveData: PropTypes.func.isRequired,
  deleteData: PropTypes.func.isRequired,
  dataSaved: PropTypes.shape({
    id: PropTypes.string,
    data: PropTypes.shape({
      label: PropTypes.shape({
        label: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
        edit: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
      }),
    }),
  }).isRequired,
};

export default Form;
