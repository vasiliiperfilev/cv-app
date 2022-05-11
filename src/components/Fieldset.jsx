/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import uniqid from 'uniqid';
import UserDataDiv from './UserDataDiv';

class Fieldset extends Component {
  constructor(props) {
    super(props);
    this.state = {
      values: {},
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const { saveData, legend } = this.props;
    const { values } = this.state;
    const data = Object.values(values).reduce((arr, currentInput) => {
      arr.push(currentInput);
      return arr;
    }, []);
    saveData(legend, data);
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

  render() {
    const { legend, inputs, dataSaved } = this.props;
    const { values } = this.state;
    let dataDisplay;
    if (dataSaved)
      dataDisplay = dataSaved.map((data) => (
        <UserDataDiv data={data} key={uniqid()} />
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
              value={values[inputProps.id] && values[inputProps.id].value}
              handleInputChange={this.handleInputChange}
            />
          );
        })}
        {/* Add only if can be more forms */}
        <button type="button" onClick={this.handleSubmit}>
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
  dataSaved: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string,
        value: PropTypes.string,
      })
    )
  ),
};
Fieldset.defaultProps = {
  dataSaved: [],
};

export default Fieldset;
