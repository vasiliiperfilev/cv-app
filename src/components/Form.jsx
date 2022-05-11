/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import Fieldset from './Fieldset';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSaved: {},
    };
    this.saveData = this.saveData.bind(this);
  }

  saveData(legend, data) {
    this.setState((prevState) => {
      const dataAdded = prevState.dataSaved[legend]
        ? [...prevState.dataSaved[legend], data]
        : [data];
      const newDataSaved = {
        ...prevState.dataSaved,
        [legend]: dataAdded,
      };
      return {
        dataSaved: newDataSaved,
      };
    });
  }

  render() {
    const { fieldsets } = this.props;
    const { dataSaved } = this.state;
    return (
      <form>
        {fieldsets.map((fieldsetProps) => (
          <Fieldset
            legend={fieldsetProps.legend}
            inputs={fieldsetProps.inputs}
            dataSaved={dataSaved[fieldsetProps.legend]}
            saveData={this.saveData}
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
      // savedData: PropTypes.arrayOf(
      //   PropTypes.arrayOf(
      //     PropTypes.shape({
      //       label: PropTypes.string,
      //       value: PropTypes.string,
      //     })
      //   )
      // ).isRequired,
    })
  ).isRequired,
};

export default Form;
