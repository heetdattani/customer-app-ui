import { CCard, CCardBody, CCardHeader, CCol, CFormSwitch, CInputGroup, CRow } from '@coreui/react'
import React, { useEffect, useMemo, useState } from 'react'
import { FaPlus, FaSort, FaSortDown, FaSortUp } from 'react-icons/fa'
import { FaPencil } from 'react-icons/fa6'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import CustomButton from '../../../components/Button'
import CustomSelect from '../../../components/CustomSelect'
import FormInput from '../../../components/FormInput'
import Pagination from '../../../components/Pagination'
import { showToastr } from '../../../components/ToastrNotification'
import { filterButtons, statusHeader } from '../../../constant/htmlConstant'
import { titleConstants } from '../../../constant/titleConstant'
import { useApiRequest } from '../../../helpers/apiRequest'
import { createListSerialNo, isLoggedUserDataOwner } from '../../../helpers/common-unitl'
import DeletePopUpModal from '../../../components/DeletePopUpModal'
const CustomerManagement = () => {
  const { changeCustomerStatus, deleteCustomerData, getCustomerDataList } = useApiRequest()
  const [fields, setFields] = useState({
    sort_dir: '',
    sort_field: '',
    name: '',
    page_no: 1,
  })
  const [isReset, setIsReset] = useState(true)
  const [customerDataLists, setCustomerDataLists] = useState([])
  const [openPopup, setOpenPopup] = useState(false)
  const [deleteId, setDeleteId] = useState(null)
  const [pagination, setPagination] = useState(null)
  const [page, setPage] = useState(1)
  // === Get logged user data from state === //
  const userData = useSelector((state) => state.user)

  // === Pagination function === //
  const handlePageChange = (newPage) => {
    setPage(newPage)
    setFields({ ...fields, page_no: newPage })
  }
  // === Open modal for delete === //
  const openDeletePopup = (id, visible) => {
    setDeleteId(id)
    setOpenPopup(!visible)
  }
  // === Close modal for delete === //
  const closeDeletePopup = () => {
    setOpenPopup(false)
    setDeleteId(null)
  }
  // === Set sorting column and it's sorting order === //
  const handleCustomerColumnSort = (fieldName) => {
    setFields((prevFields) => ({
      ...prevFields,
      sort_dir: prevFields.sort_dir === 'asc' ? 'desc' : 'asc',
      sort_field: fieldName,
    }))
  }
  // === For serach set the name, email value === //
  const handleChange = (e) => {
    const { name, value } = e.target
    setPage(1)
    setFields((prevFields) => ({
      ...prevFields,
      [name]: value,
      page_no: 1,
    }))
  }
  // === Reset function === //
  const handleCustomerReset = () => {
    setIsReset(!isReset)
    setPage(1)
    setFields({
      sort_dir: '',
      sort_field: '',
      name: '',
      page_no: 1,
    })
  }
  // === Get list of customers === //
  const getCustomerLists = async () => {
    try {
      const response = await getCustomerDataList(fields)
      if (response?.data?.status) {
        const dataResult = response?.data?.data
        setCustomerDataLists(dataResult?.result)
        setPagination({
          current: dataResult?.page,
          totalPage: dataResult?.totalPage,
          totalRecords: dataResult?.totalRecords,
        })
      } else {
        showToastr(response?.data?.message ?? 'Someting went wrong', 'error')
      }
    } catch (error) {
      showToastr(error?.response?.data?.message ?? 'Failed to get customer list data', 'error')
    }
  }
  // === Change status of customer === //
  const changeCustomerStatusData = async (statusValue, id) => {
    try {
      const response = await changeCustomerStatus(id, { status: statusValue })
      if (response?.data?.status) {
        showToastr(response?.data?.message, 'success', getCustomerLists())
      } else {
        showToastr(response?.data?.message ?? 'Someting went wrong', 'error')
      }
    } catch (error) {
      showToastr(error?.response?.data?.message ?? 'Failed to change customer status data', 'error')
    }
  }
  // === Delete data of customer === //
  const deleteCustomer = async () => {
    try {
      setOpenPopup(false)
      const response = await deleteCustomerData(deleteId)
      if (response?.data?.status) {
        showToastr(
          response?.data?.message ?? 'Customer data deleted successfully.',
          'success',
          getCustomerLists(),
        )
      } else {
        showToastr(response?.data?.message ?? 'Someting went wrong', 'error')
      }
    } catch (error) {
      showToastr(error?.response?.data?.message ?? 'Failed to delete customer', 'success')
    } finally {
      setOpenPopup(false)
    }
  }
  useEffect(() => {
    getCustomerLists()
  }, [page, fields.sort_dir, fields.sort_field, fields.customer_group_id, isReset])
  return (
    <>
      <CRow>
        <CCol xl={12}>
          <CCard className="customer-lists">
            <CCardHeader className={'font-weight-bold h5'}>
              {titleConstants.CUSTOMER_LIST_TITLE}
              <div className={'card-header-actions'}>
                <Link to="/customer/add">
                  <CustomButton
                    color="primary"
                    active
                    tabIndex={-1}
                    className="btn-sm"
                    labelClass={'ml-1'}
                    text="Add"
                    icon={<FaPlus className="mb-1 mr-1" />}
                  />
                </Link>
              </div>
            </CCardHeader>
            <CCardBody>
              <CRow className="mb-1">
                <CInputGroup className="row">
                  <CCol xl={3}>
                    <FormInput
                      id="name"
                      placeholder="Search name"
                      name="name"
                      value={fields.name}
                      onChange={handleChange}
                      onBlur={getCustomerLists}
                      onKeyPress={(event) => {
                        if (event.key === 'Enter') {
                          getCustomerLists()
                        }
                      }}
                      style={{ lineHeight: '17px' }}
                    />
                  </CCol>
                  {filterButtons(getCustomerLists, handleCustomerReset)}
                </CInputGroup>
              </CRow>
              <div className="position-relative table-responsive">
                <table className="table without-table-action">
                  <thead>
                    <tr>
                      <th width="10%">Id</th>
                      <th onClick={() => handleCustomerColumnSort('name')}>
                        <span className="sortCls">
                          <span className="table-header-text-mrg">Name</span>
                          {fields.sort_field !== 'name' && customerDataLists.length > 0 && (
                            <FaSort />
                          )}
                          {fields.sort_dir === 'asc' &&
                            fields.sort_field === 'name' &&
                            customerDataLists.length > 0 && <FaSortUp />}
                          {fields.sort_dir === 'desc' &&
                            fields.sort_field === 'name' &&
                            customerDataLists.length > 0 && <FaSortDown />}
                        </span>
                      </th>
                      <th>
                        <span className="sortCls">
                          <span className="table-header-text-mrg">Phone</span>
                        </span>
                      </th>

                      <th width="10%" style={{ textAlign: 'center' }}>
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {customerDataLists.length > 0 ? (
                      customerDataLists.map((customerData, index) => (
                        <tr key={customerData.id + '_' + customerData.email}>
                          <td>{customerData.id}</td>
                          <td>{customerData.name}</td>
                          <td>{customerData.phone}</td>
                          <>
                            <td style={{ textAlign: 'center' }}>
                              <Link to={`/customer/edit/${customerData.id}`}>
                                <CustomButton
                                  color="primary"
                                  className="ml-1 btn-sm"
                                  isToolTip={true}
                                  size="sm"
                                  toolTipContent={titleConstants.CUSTOMER_EDIT_TITLE}
                                  text={<FaPencil size={'13px'} />}
                                />
                              </Link>
                              <CustomButton
                                color="danger"
                                className="ml-1 btn-sm"
                                isToolTip={true}
                                size="sm"
                                toolTipContent={titleConstants.CUSTOMER_DELETE_TITLE}
                                text={<RiDeleteBin6Line size={'13px'} />}
                                onClick={() => openDeletePopup(customerData.id)}
                              />
                            </td>
                          </>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={6} style={{ textAlign: 'center' }}>
                          No data available
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
                {pagination && customerDataLists.length > 0 && (
                  <Pagination
                    page={pagination.current}
                    fields={pagination}
                    handlePageChange={handlePageChange}
                  />
                )}
              </div>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      {/* Modal for Deleting an customer */}
      <DeletePopUpModal
        openPopup={openPopup}
        closeDeletePopup={closeDeletePopup}
        deleteData={deleteCustomer}
        titleText={'customer'}
      />
    </>
  )
}

export default CustomerManagement
