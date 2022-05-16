/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import Form from './components/Form';
import UserDataDiv from './components/UserDataDiv';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isWorkMode: true,
      dataSaved: {
        Personal: {
          main: {
            Name: {
              value: 'Name',
              edit: false,
              type: 'text',
            },
            Email: {
              value: 'Email',
              edit: false,
              type: 'email',
            },
          },
        },
      },
    };
    this.saveData = this.saveData.bind(this);
    this.deleteData = this.deleteData.bind(this);
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

  render() {
    const { fieldsets } = this.props;
    const { isWorkMode, dataSaved } = this.state;
    let output;
    if (isWorkMode) {
      output = (
        <div>
          <UserDataDiv
            id="main"
            data={dataSaved.Personal.main}
            type="text"
            changeValues={this.saveData}
            legend="Personal"
          />
          <Form
            fieldsets={fieldsets}
            saveData={this.saveData}
            deleteData={this.deleteData}
            dataSaved={dataSaved}
          />
        </div>
      );
    } else {
      output = '';
    }
    return (
      <div className="App">
        <button type="button">Working mode</button>
        <button type="button">Preview mode</button>
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
