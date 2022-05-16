/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import uniqid from 'uniqid';
import UserDataDiv from './UserDataDiv';
import EditablePara from './EditablePara';

class Fieldset extends Component {
  constructor(props) {
    super(props);
    this.state = {
      values: this.createEmptyValues(),
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.changeEditableState = this.changeEditableState.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete(event) {
    const { deleteData, legend } = this.props;
    deleteData(legend, event.target.parentNode.id);
  }

  handleSubmit() {
    if (this.isValid()) {
      const { saveData, legend } = this.props;
      const { values } = this.state;
      const data = Object.values(values).reduce((obj, currentInput) => {
        // eslint-disable-next-line no-param-reassign
        if (currentInput.value) obj[currentInput.label] = { ...currentInput };
        return obj;
      }, {});
      saveData(legend, data, uniqid());
    }
  }

  handleInputChange(event) {
    this.setState((prevState) => ({
      values: {
        ...prevState.values,
        [event.target.id]: {
          label: event.target.parentNode.innerText,
          value: event.target.value,
          edit: prevState.values[event.target.id].edit,
        },
      },
    }));
  }

  changeEditableState(id) {
    this.setState((prevState) => {
      const { label, value, edit } = prevState.values[id];
      return {
        values: {
          ...prevState.values,
          [id]: {
            label,
            value,
            edit: !edit,
          },
        },
      };
    });
  }

  createEmptyValues() {
    const { inputs } = this.props;
    const values = inputs.reduce((obj, input) => {
      // eslint-disable-next-line no-param-reassign
      obj[input.id] = {
        value: '',
        label: '',
        edit: false,
      };
      return obj;
    }, {});
    return values;
  }

  isValid() {
    const { inputs } = this.props;
    const { values } = this.state;
    return !inputs.some((input) => input.required && !values[input.id].value);
  }

  render() {
    const { legend, inputs, dataSaved, multi, saveData } = this.props;
    const { values } = this.state;
    let dataDisplay;
    if (dataSaved)
      // need to pass type as array or smthing
      dataDisplay = Object.entries(dataSaved).map(([id, data]) => (
        <UserDataDiv
          id={id}
          data={data}
          key={id}
          handleDelete={this.handleDelete}
          type={inputs.find((element) => element.label === data.label).type}
          changeValues={saveData}
          legend={legend}
        />
      ));
    // Change Personal to UserDataDiv that is rendered as a separate component
    // Delete as part of fieldset only
    // remove edit from create empty values, add only when saved
    // remove Personal props from InputComponent
    // rename Submit for Add
    // remove edit from handleChange
    return (
      <fieldset>
        <legend>{legend}</legend>
        {dataSaved && dataDisplay}
        {inputs.map((inputProps) => {
          const InputComponent = inputProps.component;
          return (
            <InputComponent
              type={inputProps.type}
              labelText={inputProps.labelText}
              placeholder={`Enter ${inputProps.labelText.toLowerCase()}`}
              required={inputProps.required}
              key={inputProps.id}
              id={inputProps.id}
              value={values[inputProps.id].value}
              handleInputChange={this.handleInputChange}
              edit={
                InputComponent === EditablePara && values[inputProps.id].edit
              }
              changeEdit={this.changeEditableState}
            />
          );
        })}
        {multi && (
          <button type="button" onClick={this.handleSubmit}>
            Add
          </button>
        )}
      </fieldset>
    );
  }
}
Fieldset.propTypes = {
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
  saveData: PropTypes.func.isRequired,
  deleteData: PropTypes.func.isRequired,
  dataSaved: PropTypes.shape({
    id: PropTypes.string,
    data: PropTypes.shape({
      label: PropTypes.shape({
        label: PropTypes.string,
        value: PropTypes.string,
        edit: PropTypes.string,
      }),
    }),
  }),
};
Fieldset.defaultProps = {
  dataSaved: {},
  multi: true,
};

export default Fieldset;
