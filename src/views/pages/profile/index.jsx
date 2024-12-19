import {
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CForm,
  CInputGroup,
  CRow,
} from '@coreui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { FaSave } from 'react-icons/fa'
import { IoClose } from 'react-icons/io5'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, Navigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import CustomButton from '../../../components/Button'
import FormInput from '../../../components/FormInput'
import { titleConstants } from '../../../constant/titleConstant'
import { useApiRequest } from '../../../helpers/apiRequest'
import { AUTH_KEY } from '../../../helpers/storageRequests'
import { FaArrowLeftLong } from 'react-icons/fa6'

const Profile = () => {
  const { getUserProfileData } = useApiRequest()
  const { register, setValue } = useForm({})
  const token = localStorage.getItem(AUTH_KEY)
  const dispatch = useDispatch()
  const userData = useSelector((state) => state.user)

  // === Get data os logged in user if it is not in state === //
  const getUserData = async () => {
    try {
      const result = await getUserProfileData()
      if (result?.data?.status) {
        dispatch({ type: 'SET_USER', user: result?.data?.data })
      }
    } catch (error) {
      toast.error(error?.response?.data?.message)
    }
  }
  useEffect(() => {
    if (userData === null || userData === undefined) {
      getUserData()
    } else {
      setValue('email', userData.email)
    }
  }, [userData])

  if (!token) {
    return <Navigate to={'/login'} />
  }
  return (
    <CRow>
      <CCol xs="12">
        <CCard>
          <CCardHeader className={'font-weight-bold h5'}>
            {titleConstants.PROFILE}
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
          <CForm className="admin-add">
            <CCardBody>
              <CInputGroup className="row">
                <div className="mb-1 col-sm-6">
                  <FormInput
                    readOnly
                    {...register('email')}
                    placeholder="Enter email"
                    label={'Email'}
                  />
                </div>
              </CInputGroup>
            </CCardBody>
          </CForm>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Profile
