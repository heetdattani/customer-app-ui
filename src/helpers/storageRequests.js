export const AUTH_KEY = 'CLIENT_AUTH'
const AUTH_REFRESH_KEY = 'AUTH_REFRESH'

// LOCAL STORAGE set Auth data
export const setAuth = (token) => {
  if (!localStorage) return false
  localStorage.setItem(AUTH_KEY, token)
  return true
}

// LOCAL STORAGE set Auth data
export const getAuth = () => {
  if (!localStorage) return null
  const token = localStorage.getItem(AUTH_KEY)
  if (token === 'undefined' || token === 'null' || !token) return null
  return token
}

// LOCAL STORAGE remove Auth data
export const removeAuth = () => {
  if (localStorage) return localStorage.removeItem(AUTH_KEY)
}

export const storageRequest = {
  setAuth,
  getAuth,
  removeAuth,
}
