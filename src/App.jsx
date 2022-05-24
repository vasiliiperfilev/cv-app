/* eslint-disable react/prefer-stateless-function */
import React, { useState } from 'react';
import { PropTypes } from 'prop-types';
import Form from './components/Form';
import UserDataDiv from './components/UserDataDiv';
import CvPreview from './components/CvPreview';
import './styles/app.css';

function App(props) {
  const { fieldsets } = props;
  const [isWorkMode, setIsWorkMode] = useState(false);
  const [dataSaved, setDataSaved] = useState({
    Personal: {
      main: {
        Name: {
          value: 'Enter name',
          edit: false,
          type: 'text',
          label: 'Name',
        },
        Currentposition: {
          value: 'Enter current position',
          edit: false,
          type: 'text',
          label: 'Current position',
        },
        Phone: {
          value: 'Enter your phone',
          edit: false,
          type: 'tel',
          label: 'Phone',
        },
      },
      secondary: {
        Address: {
          value: 'Enter address',
          edit: false,
          type: 'text',
          label: 'Address',
        },
        Email: {
          value: 'Enter email',
          edit: false,
          type: 'email',
          label: 'Email',
        },
        LinkedIn: {
          value: 'Enter LinkedIn link',
          edit: false,
          type: 'url',
          label: 'LinkedIn',
        },
      },
    },
  });

  function deleteData(fieldset, id) {
    const newDataSaved = {
      ...dataSaved,
    };
    delete newDataSaved[fieldset][id];
    setDataSaved(newDataSaved);
  }

  function saveData(legend, data, id) {
    const dataWithNewSave = dataSaved[legend]
      ? { ...dataSaved[legend], [id]: data }
      : { [id]: data };
    const newDataSaved = {
      ...dataSaved,
      [legend]: dataWithNewSave,
    };
    setDataSaved(newDataSaved);
  }

  function switchMode() {
    setIsWorkMode(!isWorkMode);
  }

  function generateOutput() {
    if (isWorkMode) {
      return (
        <div className="inputs">
          <div className="Personal">
            {Object.entries(dataSaved.Personal).map(
              ([categoryName, fields]) => (
                <UserDataDiv
                  id={categoryName}
                  key={categoryName}
                  data={fields}
                  changeValues={(legend, data, id) =>
                    saveData(legend, data, id)
                  }
                  legend="Personal"
                />
              )
            )}
          </div>
          <Form
            fieldsets={fieldsets}
            saveData={(legend, data, id) => saveData(legend, data, id)}
            deleteData={(fieldset, id) => deleteData(fieldset, id)}
            dataSaved={dataSaved}
          />
        </div>
      );
    }
    return (
      <CvPreview
        personal={dataSaved.Personal}
        education={dataSaved.Education}
        experience={dataSaved.Experience}
      />
    );
  }

  return (
    <div className="App">
      <div className="controls">
        <button type="button" onClick={() => switchMode()}>
          Working mode | Preview mode
        </button>
      </div>
      {generateOutput()}
    </div>
  );
}

App.propTypes = {
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
    }).isRequired
  ).isRequired,
};

export default App;
