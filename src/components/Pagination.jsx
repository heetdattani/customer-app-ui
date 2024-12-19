import { CPagination, CPaginationItem } from '@coreui/react'
import PropTypes from 'prop-types'

const Pagination = ({ page, fields, handlePageChange }) => {
  return (
    <CPagination align="end" aria-label="Page navigation example" className="mt-3">
      <CPaginationItem
        aria-label="Previous"
        disabled={page === 1}
        onClick={() => handlePageChange(page - 1)}
      >
        &laquo;
      </CPaginationItem>
      {Array.from({ length: fields.totalPage }, (_, index) => (
        <CPaginationItem
          key={index + 1}
          active={index + 1 === page}
          onClick={() => handlePageChange(index + 1)}
        >
          {index + 1}
        </CPaginationItem>
      ))}
      <CPaginationItem
        aria-label="Next"
        disabled={page === fields.totalPage}
        onClick={() => handlePageChange(page + 1)}
      >
        &raquo;
      </CPaginationItem>
    </CPagination>
  )
}

Pagination.propTypes = {
  fields: PropTypes.shape({
    totalPage: PropTypes.number.isRequired,
  }).isRequired,
  page: PropTypes.number.isRequired,
  handlePageChange: PropTypes.func,
}
export default Pagination
