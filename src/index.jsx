import React from 'react';
import ReactDOM from 'react-dom/client';
import uniqid from 'uniqid';
import App from './App';
import TextArea from './components/TextArea';
import Input from './components/Input';
import EditablePara from './components/EditablePara';

const data = {
  fieldsets: [
    {
      legend: 'Personal',
      inputs: [
        {
          component: EditablePara,
          labelText: 'Name',
          type: 'text',
          required: true,
          id: uniqid(),
        },
        {
          component: EditablePara,
          labelText: 'Phone',
          type: 'tel',
          required: true,
          id: uniqid(),
        },
        {
          component: EditablePara,
          labelText: 'Email',
          type: 'email',
          required: true,
          id: uniqid(),
        },
        {
          component: EditablePara,
          labelText: 'LinkedIn',
          type: 'url',
          required: false,
          id: uniqid(),
        },
      ],
      multi: false,
    },
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
