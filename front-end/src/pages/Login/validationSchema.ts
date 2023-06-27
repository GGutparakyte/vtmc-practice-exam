import * as yup from 'yup';

export const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email('Invalid email')
    .required('Email is required'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters long')
    .matches(/^(?=.*[A-Z])(?=.*[0-9])/, 'Password must contain at least one uppercase letter and one number'),
  firstName: yup.string().when('isRegistration', {
    is: true,
    then: yup.string().required('First name is required'),
    otherwise: yup.string().notRequired(),
  }),
  lastName: yup.string().when('isRegistration', {
    is: true,
    then: yup.string().required('Last name is required'),
    otherwise: yup.string().notRequired(),
  }),
});