/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import Form from './components/Form';
import UserDataDiv from './components/UserDataDiv';
import CvPreview from './components/CvPreview';
import './styles/app.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isWorkMode: true,
      dataSaved: {
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
      },
    };
    this.saveData = this.saveData.bind(this);
    this.deleteData = this.deleteData.bind(this);
    this.switchMode = this.switchMode.bind(this);
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

  switchMode() {
    this.setState((prevState) => ({
      isWorkMode: !prevState.isWorkMode,
    }));
  }

  render() {
    const { fieldsets } = this.props;
    const { isWorkMode, dataSaved } = this.state;
    let output;
    if (isWorkMode) {
      output = (
        <div className="inputs">
          <div className="Personal">
            {Object.entries(dataSaved.Personal).map(
              ([categoryName, fields]) => (
                <UserDataDiv
                  id={categoryName}
                  key={categoryName}
                  data={fields}
                  changeValues={this.saveData}
                  legend="Personal"
                />
              )
            )}
          </div>
          <Form
            fieldsets={fieldsets}
            saveData={this.saveData}
            deleteData={this.deleteData}
            dataSaved={dataSaved}
          />
        </div>
      );
    } else {
      output = (
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
          <button type="button" onClick={this.switchMode}>
            Working mode | Preview mode
          </button>
        </div>
        {output}
      </div>
    );
  }
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
