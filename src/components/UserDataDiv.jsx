/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import { PropTypes } from 'prop-types';
import EditablePara from './EditablePara';

function UserDataDiv(props) {
  const { changeValues, legend, data, id } = props;
  const getParaLabel = (paraId) => paraId.slice(id.length, paraId.length);

  function handleInputChange(event) {
    const paraLabel = getParaLabel(event.target.id);
    const newData = { ...data };
    newData[paraLabel].value = event.target.value;
    changeValues(legend, newData, id);
  }

  function changeEdit(paraId) {
    const paraLabel = getParaLabel(paraId);
    const newData = { ...data };
    newData[paraLabel].edit = !newData[paraLabel].edit;
    const para = document.querySelector(`#${paraId}`);
    if (para.tagName === 'P' || para.checkValidity()) {
      changeValues(legend, newData, id);
    } else {
      para.reportValidity();
    }
  }

  return (
    <div id={id}>
      {Object.entries(data).map(([dataId, { value, edit, type, label }]) => (
        <EditablePara
          value={value}
          id={id + dataId}
          key={label}
          edit={edit}
          type={type}
          required
          handleInputChange={(event) => handleInputChange(event)}
          changeEdit={(paraId) => changeEdit(paraId)}
          labelText={label}
        />
      ))}
    </div>
  );
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
