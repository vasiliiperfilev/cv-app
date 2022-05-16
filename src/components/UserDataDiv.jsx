/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import EditablePara from './EditablePara';

class UserDataDiv extends Component {
  constructor(props) {
    super(props);
    this.changeEdit = this.changeEdit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const { value } = event.target;
    const paraId = event.target.id;
    const { changeValues, legend, data, id } = this.props;
    const newData = { ...data };
    const paraLabel = paraId.slice(id.length, paraId.length);
    newData[paraLabel].value = value;
    changeValues(legend, newData, id);
  }

  changeEdit(paraId) {
    const { changeValues, legend, data, id } = this.props;
    const newData = { ...data };
    const paraLabel = paraId.slice(id.length, paraId.length);
    newData[paraLabel].edit = !newData[paraLabel].edit;
    changeValues(legend, newData, id);
  }

  render() {
    const { data, id } = this.props;
    return (
      <div id={id}>
        {Object.entries(data).map(([label, { value, edit, type }]) => (
          <EditablePara
            value={value}
            id={id + label}
            key={label}
            edit={edit}
            type={type}
            required
            handleInputChange={this.handleInputChange}
            changeEdit={this.changeEdit}
            labelText={label}
          />
        ))}
      </div>
    );
  }
}

UserDataDiv.propTypes = {
  id: PropTypes.string.isRequired,
  data: PropTypes.shape({
    label: PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string,
      edit: PropTypes.string,
    }),
  }).isRequired,
  changeValues: PropTypes.func.isRequired,
  legend: PropTypes.string.isRequired,
};

export default UserDataDiv;
