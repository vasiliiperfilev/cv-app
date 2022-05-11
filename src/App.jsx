/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import Form from './components/Form';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isWorkMode: true,
    };
  }

  render() {
    const { fieldsets } = this.props;
    const { isWorkMode } = this.state;
    let output;
    if (isWorkMode) {
      output = <Form fieldsets={fieldsets} />;
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
      savedData: PropTypes.arrayOf(
        PropTypes.arrayOf(
          PropTypes.shape({
            label: PropTypes.string,
            value: PropTypes.string,
          })
        )
      ).isRequired,
    }).isRequired
  ).isRequired,
};

export default App;
