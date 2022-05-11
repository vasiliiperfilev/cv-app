/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { PropTypes } from 'prop-types';

class EditablePara extends Component {
  // constructor(props) {
  //   super(props)
  // }

  render() {
    const { value, placeholder, id } = this.props;
    return (
      // eslint-disable-next-line jsx-a11y/label-has-associated-control
      <p id={id}>{value || placeholder}</p>
    );
  }
}

EditablePara.propTypes = {
  value: PropTypes.string,
  placeholder: PropTypes.string,
  id: PropTypes.string.isRequired,
};
EditablePara.defaultProps = {
  value: '',
  placeholder: 'value',
};

export default EditablePara;
