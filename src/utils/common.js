import * as storage from './../helpers/storageRequests'
export const removeAuthAndRedirectToLogin = () => {
  window.location.href = '/login'
  storage.removeAuth()
}

export function authHeaderMutlipart(module_name = '', action = '') {
  const token = storage.getAuth()

  if (token) {
    return {
      method: 'POST',
      authorization: `Bearer ${token}`,
      module_name: module_name,
      action: action,
    }
  } else {
    return { 'Content-Type': 'application/json' }
  }
}

export const TinyReactPlugIns = [
  'advlist',
  'autolink',
  'lists',
  'link',
  'image',
  'charmap',
  'preview',
  'anchor',
  'searchreplace',
  'visualblocks',
  'code',
  'fullscreen',
  'insertdatetime',
  'media',
  'table',
  'code',
  'help',
  'wordcount',
]
