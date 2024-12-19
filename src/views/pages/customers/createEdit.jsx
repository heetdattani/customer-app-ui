import {
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CForm,
  CFormLabel,
  CFormSwitch,
  CInputGroup,
  CRow,
} from '@coreui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { FaSave } from 'react-icons/fa'
import { FaArrowLeftLong } from 'react-icons/fa6'
import { IoClose } from 'react-icons/io5'
import { useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import CustomButton from '../../../components/Button'
import FormInput from '../../../components/FormInput'
import { showToastr } from '../../../components/ToastrNotification'
import { titleConstants } from '../../../constant/titleConstant'
import { useApiRequest } from '../../../helpers/apiRequest'
import { isLoggedUserDataOwner } from '../../../helpers/common-unitl'
import { createCustomerSchema } from '../../../validation/customer-validation-schema'
import FormTextArea from '../../../components/FormTextArea'
const CustomerCreateEdit = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { createNewCustomer, getCustomerData, updateCustomerData } = useApiRequest()
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(createCustomerSchema),
    defaultValues: {
      status: true,
    },
  })
  // ==== Submit function to create and update data of customer ==== //
  const onSubmit = async (payload) => {
    let result
    try {
      if (id) {
        result = await updateCustomerData(id, payload)
      } else {
        result = await createNewCustomer(payload)
      }
      if (result?.data?.status) {
        showToastr(result?.data?.message, 'success')
        navigate('/customer')
        reset()
      } else {
        showToastr(result?.data?.message, 'error')
      }
    } catch (error) {
      showToastr(error?.response?.data?.message, 'error')
    }
  }
  useEffect(() => {
    async function fetchData() {
      try {
        const result = await getCustomerData(id)
        if (result?.data?.status) {
          const customerData = result.data.data
          // Use setValue to populate form fields
          setValue('name', customerData.name)
          setValue('address', customerData.address)
          setValue('phone', customerData.phone)
        }
      } catch (error) {
        showToastr('Failed to load customer data.', 'error')
      }
    }
    if (id) {
      fetchData()
    }
  }, [id, setValue])

  return (
    <CRow>
      <CCol xs="12">
        <CCard>
          <CCardHeader className={'font-weight-bold h5'}>
            {id ? titleConstants.CUSTOMER_EDIT_TITLE : titleConstants.CUSTOMER_ADD_TITLE}
            <div className="card-header-actions">
              <Link to="/customer">
                <CustomButton
                  color="danger"
                  className="btn-sm"
                  labelClass={'ml-2'}
                  text="Back"
                  icon={<FaArrowLeftLong className="mb-1" />}
                />
              </Link>
            </div>
          </CCardHeader>

          <CForm onSubmit={handleSubmit(onSubmit)} className="customer-add">
            <CCardBody>
              <CInputGroup className="row">
                <div className="mb-1 col-sm-6">
                  <FormInput
                    {...register('name')}
                    placeholder="Enter name"
                    autoComplete="name"
                    error={errors?.name?.message}
                    disable={isSubmitting}
                    label={'Name'}
                  />
                </div>
                <div className="mb-1 col-sm-6">
                  <FormInput
                    {...register('phone')}
                    placeholder="Enter phone number"
                    autoComplete="email"
                    error={errors?.phone?.message}
                    disable={isSubmitting}
                    label={'Phone'}
                  />
                </div>
              </CInputGroup>
              <CInputGroup className="row">
                <div className="mb-1 col-sm-12">
                  <FormTextArea
                    {...register('address')}
                    placeholder="Enter address"
                    autoComplete="address"
                    error={errors?.address?.message}
                    disable={isSubmitting}
                    label={'Address'}
                    rows={5} // Number of rows (height)
                    cols={50} // Number of columns (width)
                  />
                </div>
              </CInputGroup>
            </CCardBody>
            <CCardFooter>
              <CustomButton
                color="primary"
                disabled={isSubmitting}
                type="submit"
                className="mt-1 btn-sm"
                labelClass={'ml-1'}
                text={
                  isSubmitting
                    ? titleConstants.BUTTON_SUBMITTING_TITLE
                    : titleConstants.BUTTON_SUBMIT_TITLE
                }
                icon={<FaSave className="mb-1 mr-1" />}
              />
              &nbsp;
              <Link aria-current="page" to="/customer">
                <CustomButton
                  color="danger"
                  className="mt-1 btn-sm"
                  text="Cancel"
                  disabled={isSubmitting}
                  labelClass={'ml-1'}
                  icon={<IoClose className="mb-1 mr-1" size={'16px'} />}
                />
              </Link>
            </CCardFooter>
          </CForm>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default CustomerCreateEdit
