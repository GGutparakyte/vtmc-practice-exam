import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Formik, Form, FormikHelpers } from 'formik';

import InputField from 'pages/shared/inputField/inputField';

import { validationSchema } from './validationSchema';

interface Values {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

const inputFields = [
  { name: 'email', type: 'email' },
  { name: 'password', type: 'password' },
  { name: 'firstName' },
  { name: 'lastName' },
];

const initialValues: Values = {
  email: '',
  password: '',
  firstName: '',
  lastName: '',
};

const Login: React.FC = () => {
  const { t } = useTranslation();
  const [isRegistration, setIsRegistration] = useState(false); 

  const handleSubmit = (values: Values, { setSubmitting, resetForm }: FormikHelpers<Values>) => {
    setSubmitting(false);
    resetForm();
  };

  return (
    <div className="login">
      <h1 className="header-secondary">
        {isRegistration ?  t('landingPage.loginSection.register') : t('landingPage.loginSection.login')}
      </h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ submitForm, isSubmitting, isValid, dirty }) => (
          <Form className='form'>
            <div className='form-input-fields'>
              {inputFields.map((field) => (
                !(field.name === 'firstName' || field.name === 'lastName') || isRegistration ? (
                  <InputField
                    key={field.name}
                    name={field.name}
                    type={field.type}
                    label={field.name}
                    placeholder={field.name}
                  />
                ) : null
              ))}
            </div>
            <button
              type="submit"
              disabled={isSubmitting || !isValid || !dirty}
              // onClick={submitForm}
            >
              {isRegistration ?  t('landingPage.loginSection.register') : t('landingPage.loginSection.login')}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};


export default Login;