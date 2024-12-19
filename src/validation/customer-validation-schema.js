import * as yup from 'yup'

export const createCustomerSchema = yup.object().shape({
  name: yup.string().required('Name is required').max(20, 'Name must not exceed 255 characters'),
  phone: yup.string().required('Phone is required'),
  address: yup
    .string()
    .required('Address is required')
    .max(255, 'Address must not exceed 255 characters'),
})
