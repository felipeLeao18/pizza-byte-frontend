import axios, { AxiosError } from 'axios'
import { parseCookies } from 'nookies'
import { signOut } from '../contexts/AuthContext'
import { AuthTokenError } from './errors/AuthTokenError'

export function setupAPIClient (ctx = undefined) {
  const cookies = parseCookies(ctx)

  const api = axios.create({
    baseURL: 'http://localhost:3333/',
    headers: {
      Authorization: `Bearer ${cookies['@pizzabyte.token']}`
    }
  })

  api.interceptors.response.use(response => {
    return response
  }, async (err: AxiosError) => {
    if (err.response?.status === 403) {
      if (typeof window !== 'undefined') {
        signOut()
      }
      return await Promise.reject(new AuthTokenError())
    }
    return await Promise.reject(err)
  })

  return api
}
