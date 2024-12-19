import React from 'react'
import { titleConstants } from '../constant/titleConstant'
import { IoClose } from 'react-icons/io5'
import { RiDeleteBin6Line } from 'react-icons/ri'
import CustomButton from './Button'
import { CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react'
import PropTypes from 'prop-types'

const DeletePopUpModal = ({ titleText, openPopup, closeDeletePopup, deleteData }) => {
  return (
    <CModal visible={openPopup} onClose={closeDeletePopup} size="md" color="danger">
      <CModalHeader closeButton>
        <CModalTitle>Delete</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <span>Are you sure you want to delete this {titleText} ? </span>
      </CModalBody>
      <CModalFooter>
        <CustomButton
          color="danger"
          className="btn-sm d-flex align-items-center "
          isToolTip={true}
          toolTipContent={titleConstants.DELETE_TEXT}
          text="Yes"
          labelClass="ml-1"
          icon={<RiDeleteBin6Line />}
          onClick={deleteData}
        />
        <CustomButton
          color="secondary"
          className="btn-sm d-flex align-items-center "
          isToolTip={true}
          text="Cancel"
          labelClass="ml-1"
          toolTipContent={'Cancel'}
          icon={<IoClose />}
          onClick={closeDeletePopup}
        />
      </CModalFooter>
    </CModal>
  )
}
DeletePopUpModal.propTypes = {
  openPopup: PropTypes.bool,
  titleText: PropTypes.string,
  closeDeletePopup: PropTypes.func,
  deleteData: PropTypes.func,
}
export default DeletePopUpModal
