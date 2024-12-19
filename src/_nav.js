import { cilDrop, cilPencil, cilUser, cilUserFollow, cilSpeedometer } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CNavItem, CNavTitle } from '@coreui/react'
import React from 'react'

export const _nav = [
  {
    component: CNavItem,
    name: 'Customers',
    to: '/customer',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
  },
]

export const permissionsArray = []
