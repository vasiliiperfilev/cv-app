/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import uniqid from 'uniqid';

class UserDataDiv extends Component {
  // constructor(props) {
  //   super(props)
  // }

  render() {
    const { data } = this.props;
    return (
      <div>
        {data.map(({ label, value }) => (
          <div key={uniqid()}>
            <h4>{label}</h4>
            <p>{value}</p>
          </div>
        ))}
        <button type="button">Edit</button>
        <button type="button">Delete</button>
      </div>
    );
  }
}

UserDataDiv.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string,
    })
  ).isRequired,
};

export default UserDataDiv;
