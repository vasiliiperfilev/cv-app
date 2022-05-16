/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import uniqid from 'uniqid';
import UserDataDiv from './UserDataDiv';

class Fieldset extends Component {
  constructor(props) {
    super(props);
    this.state = {
      values: this.createEmptyValues(),
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.clearInputs = this.clearInputs.bind(this);
  }

  handleDelete(event) {
    const { deleteData, legend } = this.props;
    deleteData(legend, event.target.parentNode.children[0].id);
  }

  handleAdd() {
    if (this.isValid()) {
      const { saveData, legend, inputs } = this.props;
      const { values } = this.state;
      const data = Object.entries(values).reduce(
        (obj, [currentId, currentInput]) => {
          if (currentInput.value)
            // eslint-disable-next-line no-param-reassign
            obj[currentInput.label] = {
              ...currentInput,
              edit: false,
              type: inputs.find((input) => input.id === currentId).type,
            };
          return obj;
        },
        {}
      );
      saveData(legend, data, uniqid());
      this.clearInputs();
    }
  }

  handleInputChange(event) {
    this.setState((prevState) => ({
      values: {
        ...prevState.values,
        [event.target.id]: {
          label: event.target.parentNode.innerText,
          value: event.target.value,
        },
      },
    }));
  }

  clearInputs() {
    this.setState({
      values: this.createEmptyValues(),
    });
  }

  createEmptyValues() {
    const { inputs } = this.props;
    const values = inputs.reduce((obj, input) => {
      // eslint-disable-next-line no-param-reassign
      obj[input.id] = {
        value: '',
        label: '',
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
    const { legend, inputs, dataSaved, saveData } = this.props;
    const { values } = this.state;
    let dataDisplay;
    if (dataSaved)
      // need to pass type as array or smthing
      dataDisplay = Object.entries(dataSaved).map(([id, data]) => (
        <div key={id}>
          <UserDataDiv
            id={id}
            data={data}
            type={inputs.find((element) => element.label === data.label).type}
            changeValues={saveData}
            legend={legend}
          />
          <button type="button" onClick={this.handleDelete}>
            Delete
          </button>
        </div>
      ));
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
            />
          );
        })}
        <button type="button" onClick={this.handleAdd}>
          Add
        </button>
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
  }),
};
Fieldset.defaultProps = {
  dataSaved: {},
};

export default Fieldset;
