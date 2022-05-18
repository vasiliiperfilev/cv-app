/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { PropTypes } from 'prop-types';

class CvPreview extends Component {
  render() {
    const { personal, education, experience } = this.props;
    return (
      <div className="preview">
        <div className="personal">
          <div className="left">
            {Object.entries(personal.main).map(([label, data]) => (
              <p className={label} key={label}>
                {data.value}
              </p>
            ))}
          </div>
          <div className="right">
            {Object.entries(personal.secondary).map(([label, data]) => (
              <p className={label} key={label}>
                {data.value}
              </p>
            ))}
          </div>
        </div>
        <div className="education">
          {Object.entries(education).map(([id, dataSet]) => (
            <div key={id}>
              {Object.entries(dataSet).map(([label, data]) => (
                <p className={label} key={label}>
                  {data.value}
                </p>
              ))}
            </div>
          ))}
        </div>
        <div className="experience">
          {Object.entries(experience).map(([id, dataSet]) => (
            <div key={id}>
              {Object.entries(dataSet).map(([label, data]) => (
                <p className={label} key={label}>
                  {data.value}
                </p>
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  }
}
CvPreview.propTypes = {
  personal: PropTypes.shape({
    main: PropTypes.shape({
      label: PropTypes.shape({
        value: PropTypes.string,
      }),
    }),
    secondary: PropTypes.shape({
      label: PropTypes.shape({
        value: PropTypes.string,
      }),
    }),
  }),
  education: PropTypes.objectOf(
    PropTypes.shape({
      label: PropTypes.shape({
        value: PropTypes.string,
      }),
    })
  ),
  experience: PropTypes.objectOf(
    PropTypes.shape({
      label: PropTypes.shape({
        value: PropTypes.string,
      }),
    })
  ),
};
CvPreview.defaultProps = {
  personal: {
    main: {
      Name: {
        value: 'Name',
      },
      'Current position': {
        value: 'Current position',
      },
      Phone: {
        value: 'Phone',
      },
    },
    secondary: {
      Address: {
        value: 'Address',
      },
      Email: {
        value: 'Email',
      },
      LinkedIn: {
        value: 'LinkedIn',
      },
    },
  },
  education: {},
  experience: {},
};

export default CvPreview;
