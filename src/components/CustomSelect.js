import React, { useRef, useEffect, useState } from 'react'
import Select from 'react-select'
import { CFormFeedback } from '@coreui/react'

const CustomSelect = ({
  name,
  value,
  onChange,
  options,
  placeholder = 'Select...',
  error,
  isMulti = false,
  isSelectAll = false,
}) => {
  const wrapperRef = useRef(null)

  const [currentOptions, setCurrentOptions] = useState(options)
  useEffect(() => {
    setCurrentOptions(options)
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [options])
  const handleClickOutside = (event) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      // Handle click outside if needed (e.g., close the dropdown)
    }
  }
  const handleChange = (selectedOption) => {
    if (selectedOption.length == 0) {
      setCurrentOptions(options)
    }
    return isMulti
      ? selectedOption.map((option) => {
          if (option.value == 'all') {
            setCurrentOptions([option])
          } else {
            setCurrentOptions(options)
          }
          return option.value
        })
      : selectedOption.value
  }
  return (
    <div ref={wrapperRef} className="custom-select-wrapper">
      <Select
        name={name}
        classNames={{
          control: (state) => (state.isFocused ? 'select-focus' : ''),
        }}
        value={
          isSelectAll
            ? currentOptions.filter((o) =>
                isMulti ? value?.includes(o.value) : o?.value === value,
              )
            : options.filter((o) => (isMulti ? value?.includes(o.value) : o?.value === value))
        }
        onChange={(selectedOption) => {
          onChange(handleChange(selectedOption))
        }}
        options={isSelectAll ? currentOptions : options}
        placeholder={placeholder}
        isMulti={isMulti}
        className="react-select-container"
        classNamePrefix="react-select"
      />
      {error && (
        <CFormFeedback className="invalid-feedback d-block" invalid>
          {error}
        </CFormFeedback>
      )}
    </div>
  )
}

export default CustomSelect
