import useAxios from './../hooks/useAxios'
import * as apiUrl from '../constant/urls'
export const API_ENDPOINT = import.meta.env.VITE_APP_API_ENDPOINT

// =================== LOGIN SERVICE  =========================

const API_login = `${API_ENDPOINT}${apiUrl.loginUrl}`
const API_USER_PROFILE = `${API_ENDPOINT}${apiUrl.userProfileUrl}`
// ======== Customer SERVICE ======= //
const API_CUSTOMER_CREATE = `${API_ENDPOINT}${apiUrl.createCustomer}`
const API_CUSTOMER_VIEW = `${API_ENDPOINT}${apiUrl.viewCustomer}`
const API_CUSTOMER_UPDATE = `${API_ENDPOINT}${apiUrl.updateCustomer}`
const API_CUSTOMER_DELETE = `${API_ENDPOINT}${apiUrl.deleteCustomer}`
const API_CUSTOMER_CHANGE_STATUS = `${API_ENDPOINT}${apiUrl.changeCustomerStatus}`
const API_CUSTOMER_DATA_LIST = `${API_ENDPOINT}${apiUrl.customerDataList}`
const API_REGISTER_USER = `${API_ENDPOINT}${apiUrl.registerUser}`

export const useApiRequest = () => {
  const { axiosInstance } = useAxios()

  // POST @login API
  // @params email, password
  const loginUser = (creds) => {
    return axiosInstance.post(API_login, creds)
  }
  // POST @register API
  // @params email, password
  const registerUser = (params) => {
    return axiosInstance.post(`${API_REGISTER_USER}`, params)
  }

  //User Profile APIs
  const getUserProfileData = () => {
    return axiosInstance.get(API_USER_PROFILE)
  }

  //Customer module API calls
  const createNewCustomer = (params) => {
    return axiosInstance.post(`${API_CUSTOMER_CREATE}`, params)
  }

  const getCustomerData = (id) => {
    return axiosInstance.get(`${API_CUSTOMER_VIEW}${id}`)
  }
  const updateCustomerData = (id, params) => {
    return axiosInstance.post(`${API_CUSTOMER_UPDATE}${id}`, params)
  }
  const deleteCustomerData = (id) => {
    return axiosInstance.delete(`${API_CUSTOMER_DELETE}${id}`)
  }
  const changeCustomerStatus = (id, params) => {
    return axiosInstance.post(`${API_CUSTOMER_CHANGE_STATUS}${id}`, params)
  }
  const getCustomerDataList = (params) => {
    return axiosInstance.post(`${API_CUSTOMER_DATA_LIST}`, params)
  }

  return {
    loginUser,
    registerUser,
    getUserProfileData,
    createNewCustomer,
    getCustomerData,
    updateCustomerData,
    deleteCustomerData,
    changeCustomerStatus,
    getCustomerDataList,
  }
}
