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
    const { changeValues, legend, newData, id, paraLabel } = this.getVariables(
      event.target.id
    );
    newData[paraLabel].value = event.target.value;
    changeValues(legend, newData, id);
  }

  getVariables(paraId) {
    const { changeValues, legend, data, id } = this.props;
    const newData = JSON.parse(JSON.stringify(data));
    const paraLabel = paraId.slice(id.length, paraId.length);
    return { changeValues, legend, newData, id, paraLabel };
  }

  changeEdit(paraId) {
    const { changeValues, legend, newData, id, paraLabel } =
      this.getVariables(paraId);
    newData[paraLabel].edit = !newData[paraLabel].edit;
    const para = document.querySelector(`#${paraId}`);
    if (para.tagName === 'P' || para.checkValidity()) {
      changeValues(legend, newData, id);
    } else {
      para.reportValidity();
    }
  }

  render() {
    const { data, id } = this.props;
    return (
      <div id={id}>
        {Object.entries(data).map(([paraId, { value, edit, type, label }]) => (
          <EditablePara
            value={value}
            id={id + paraId}
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
