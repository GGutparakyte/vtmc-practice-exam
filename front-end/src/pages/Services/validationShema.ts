import * as Yup from 'yup';


export const servicesValidationSchema = Yup.object().shape({
  serviceName: Yup.string().required('validations.mandatoryField'),
  serviceAddress: Yup.string().required('validations.mandatoryField'),
  serviceCEO: Yup.string().required('validations.mandatoryField'),
});