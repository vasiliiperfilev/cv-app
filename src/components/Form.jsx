/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import Fieldset from './Fieldset';
import UserDataDiv from './UserDataDiv';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSaved: {
        Personal: {
          personalInfo: {
            Name: {
              value: 'Name',
              edit: false,
            },
            Email: {
              value: 'Email',
              edit: false,
            },
          },
        },
      },
    };
    this.saveData = this.saveData.bind(this);
    this.deleteData = this.deleteData.bind(this);
  }

  handleDelete(event) {
    this.deleteData('Personal', event.target.parentNode.id);
  }

  deleteData(fieldset, id) {
    this.setState((prevState) => {
      const newDataSaved = {
        ...prevState.dataSaved,
      };
      delete newDataSaved[fieldset][id];
      return {
        dataSaved: newDataSaved,
      };
    });
  }

  saveData(legend, data, id) {
    this.setState((prevState) => {
      const dataWithNewSave = prevState.dataSaved[legend]
        ? { ...prevState.dataSaved[legend], [id]: data }
        : { [id]: data };
      const newDataSaved = {
        ...prevState.dataSaved,
        [legend]: dataWithNewSave,
      };
      return {
        dataSaved: newDataSaved,
      };
    });
  }

  // remove handleDelete, move save data process to App level and UserDataDiv too
  // remove multi prop cause Personal is separate
  // remove Personal from fieldsets
  render() {
    const { fieldsets } = this.props;
    const { dataSaved } = this.state;
    return (
      <form>
        <UserDataDiv
          id="Personal"
          data={dataSaved.Personal.personalInfo}
          handleDelete={this.handleDelete}
          type="text"
          changeValues={this.saveData}
          legend="Personal"
        />
        {fieldsets.slice(1).map((fieldsetProps) => (
          <Fieldset
            legend={fieldsetProps.legend}
            inputs={fieldsetProps.inputs}
            dataSaved={dataSaved[fieldsetProps.legend]}
            saveData={this.saveData}
            deleteData={this.deleteData}
            key={fieldsetProps.legend}
            multi={fieldsetProps.multi}
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
      multi: PropTypes.bool,
    })
  ).isRequired,
};

export default Form;
