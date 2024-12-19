import { element } from 'prop-types'
import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const CustomerManagement = React.lazy(() => import('./views/pages/customers/list'))
const CustomerCreateEdit = React.lazy(() => import('./views/pages/customers/createEdit'))
const Profile = React.lazy(() => import('./views/pages/profile/index'))
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Register = React.lazy(() => import('./views/pages/register/Register'))
const routes = [
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/register', name: 'Register', element: Register },
  { path: '/profile', name: 'My Profile', element: Profile },
  { path: '/customer', name: 'Customers', element: CustomerManagement },
  { path: '/customer/add', name: 'Add Customer', element: CustomerCreateEdit },
  { path: `/customer/edit/:id`, name: 'Edit', element: CustomerCreateEdit },
  { path: '/login', name: 'LogIn', element: Login },
]

export default routes
