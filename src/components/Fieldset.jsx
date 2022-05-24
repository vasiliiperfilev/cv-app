/* eslint-disable react/prefer-stateless-function */
import React, { useState } from 'react';
import { PropTypes } from 'prop-types';
import uniqid from 'uniqid';
import UserDataDiv from './UserDataDiv';
import '../styles/fieldset.css';

function Fieldset(props) {
  const { legend, inputs, dataSaved, saveData, deleteData } = props;

  function createEmptyValues() {
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

  const [values, setValues] = useState(createEmptyValues());

  function isValid() {
    return !inputs.some((input) => input.required && !values[input.id].value);
  }

  function clearInputs() {
    setValues(createEmptyValues());
  }

  function handleAdd() {
    if (isValid()) {
      const data = Object.entries(values).reduce(
        (obj, [currentId, currentInput]) => {
          if (currentInput.value)
            // eslint-disable-next-line no-param-reassign
            obj[currentInput.label.split(' ').join('')] = {
              ...currentInput,
              edit: false,
              type: inputs.find((input) => input.id === currentId).type,
            };
          return obj;
        },
        {}
      );
      saveData(legend, data, uniqid());
      clearInputs();
    }
  }

  function handleInputChange(event) {
    setValues({
      ...values,
      [event.target.id]: {
        label: event.target.parentNode.innerText,
        value: event.target.value,
      },
    });
  }

  function displaySaved() {
    return Object.entries(dataSaved).map(([id, data]) => (
      <div key={id} className="saved-data">
        <UserDataDiv
          id={id}
          data={data}
          type={inputs.find((element) => element.label === data.label).type}
          changeValues={saveData}
          legend={legend}
        />
        <button
          type="button"
          onClick={(event) =>
            deleteData(legend, event.target.parentNode.children[0].id)
          }
          className="btn dlt"
        >
          Delete
        </button>
      </div>
    ));
  }

  return (
    <fieldset className={legend}>
      <legend>{legend}</legend>
      <p>Click to edit</p>
      {displaySaved()}
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
            handleInputChange={(event) => handleInputChange(event)}
          />
        );
      })}
      <button type="button" onClick={handleAdd} className="btn add">
        Add
      </button>
    </fieldset>
  );
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
