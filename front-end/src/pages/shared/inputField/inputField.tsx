import React from 'react';
import { Field, ErrorMessage  } from 'formik';

import './style.scss';

interface Props {
  label: string;
  name: string;
  type: string | undefined;
  placeholder:string;
}

const InputField: React.FC<Props> = ({ label, name, type, placeholder }) => (
  <div className="input-field">
    <label htmlFor={name}>{label}</label>
    <Field name={name} type={type} placeholder={placeholder}/>
    <ErrorMessage name={name} component="div" />
  </div>
);

export default InputField;