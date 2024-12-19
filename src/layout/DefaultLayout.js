import React, { useEffect } from 'react'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index'
import { Navigate } from 'react-router-dom'
import { AUTH_KEY } from '../helpers/storageRequests'
import { useDispatch } from 'react-redux'
import { useApiRequest } from '../helpers/apiRequest'
import { toast } from 'react-toastify'

const DefaultLayout = () => {
  const token = localStorage.getItem(AUTH_KEY)
  const dispatch = useDispatch()
  const { getUserProfileData } = useApiRequest()
  useEffect(() => {
    if (token) {
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
      getUserData()
    }
  }, [])

  if (!token) {
    return <Navigate to={'/login'} />
  }
  return (
    <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100">
        <AppHeader />
        <div className="body flex-grow-1">
          <AppContent />
        </div>
        <AppFooter />
      </div>
    </div>
  )
}

export default DefaultLayout
