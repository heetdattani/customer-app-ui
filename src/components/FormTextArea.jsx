import React from 'react'
import PropTypes from 'prop-types'
import {
  CFormFeedback,
  CFormTextarea,
  CFormLabel,
  CInputGroup,
  CInputGroupText,
} from '@coreui/react'

const FormTextArea = React.forwardRef(({ icon, label, error, ...props }, ref) => {
  return (
    <div className="form-group w-100">
      {label && <CFormLabel htmlFor={props.id || props.name}>{label}</CFormLabel>}
      <div>
        <CInputGroup>
          {icon && <CInputGroupText>{icon}</CInputGroupText>}
          <CFormTextarea ref={ref} invalid={!!error} {...props} />
        </CInputGroup>
      </div>

      {error && <CFormFeedback className="invalid-feedback d-block">{error}</CFormFeedback>}
    </div>
  )
})

FormTextArea.displayName = 'FormTextArea'

FormTextArea.propTypes = {
  label: PropTypes.string,
  error: PropTypes.string,
  name: PropTypes.string.isRequired,
  icon: PropTypes.node,
  id: PropTypes.string,
}

export default FormTextArea
