import { CCol } from '@coreui/react'
import { FaSearch, FaSort, FaSortDown, FaSortUp } from 'react-icons/fa'
import CustomButton from '../components/Button'
import { GrPowerReset } from 'react-icons/gr'

export const statusHeader = (fields, data) => {
  return (
    <span className="sortCls">
      <span className="table-header-text-mrg">Status</span>
      {fields.sort_field !== 'status' && data?.length > 0 && <FaSort />}
      {fields.sort_dir.toLowerCase() === 'asc' &&
        fields.sort_field === 'status' &&
        data?.length > 0 && <FaSortUp />}
      {fields.sort_dir.toLowerCase() === 'desc' &&
        fields.sort_field === 'status' &&
        data?.length > 0 && <FaSortDown />}
    </span>
  )
}

export const filterButtons = (onSearch, OnReset) => {
  return (
    <CCol xl={3} className="mt-1">
      <CustomButton
        type={'submit'}
        color="primary"
        className="btn-sm mr-2"
        onClick={onSearch}
        labelClass={'ml-1'}
        text="Search"
        icon={<FaSearch className="mb-1" />}
      />
      <CustomButton
        color="secondary"
        className="btn-sm"
        onClick={OnReset}
        labelClass={'ml-1'}
        text="Reset"
        icon={<GrPowerReset className="mb-1" />}
      />
    </CCol>
  )
}
