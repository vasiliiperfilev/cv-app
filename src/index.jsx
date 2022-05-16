import React from 'react';
import ReactDOM from 'react-dom/client';
import uniqid from 'uniqid';
import App from './App';
import TextArea from './components/TextArea';
import Input from './components/Input';

const data = {
  fieldsets: [
    {
      legend: 'Education',
      inputs: [
        {
          component: Input,
          labelText: 'University',
          type: 'text',
          required: true,
          id: uniqid(),
        },
        {
          component: Input,
          labelText: 'Major',
          type: 'text',
          required: true,
          id: uniqid(),
        },
        {
          component: Input,
          labelText: 'Start date',
          type: 'date',
          required: false,
          id: uniqid(),
        },
        {
          component: Input,
          labelText: 'End date',
          type: 'date',
          required: false,
          id: uniqid(),
        },
      ],
    },
    {
      legend: 'Experience',
      inputs: [
        {
          component: Input,
          labelText: 'Company',
          type: 'text',
          required: true,
          id: uniqid(),
        },
        {
          component: Input,
          labelText: 'Position',
          type: 'text',
          required: true,
          id: uniqid(),
        },
        {
          component: Input,
          labelText: 'Start date',
          type: 'date',
          required: false,
          id: uniqid(),
        },
        {
          component: Input,
          labelText: 'End date',
          type: 'date',
          required: false,
          id: uniqid(),
        },
        {
          component: TextArea,
          labelText: 'Responsibilities and achievements',
          type: 'textarea',
          required: false,
          id: uniqid(),
        },
      ],
    },
  ],
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App fieldsets={data.fieldsets} />
  </React.StrictMode>
);
