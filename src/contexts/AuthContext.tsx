/* eslint-disable @typescript-eslint/consistent-type-assertions */
import Router from 'next/router'
import { destroyCookie, parseCookies, setCookie } from 'nookies'
import { createContext, ReactNode, useEffect, useState } from 'react'
import { api } from '@/src/services/apiClient'
import { toast } from 'react-toastify'
import { GetServerSideProps } from 'next'

interface AuthContextData {
  user?: UserProps
  isAuth: boolean
  signIn: (credentials: SignInProps) => Promise<void>
  signOut: () => void
}

interface UserProps {
  id: string
  name: string
  email: string
}

interface SignInProps {
  email: string
  password: string
}

interface AuthProviderProps { children: ReactNode }

const authContextData = {} as AuthContextData
export const AuthContext = createContext(authContextData)

export function signOut () {
  try {
    destroyCookie(undefined, '@pizzabyte.token')
    void Router.push('/')
  } catch (err: any) {
    throw new Error(err.message)
  }
}
export function AuthProvider ({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProps | undefined>()
  const isAuth = (user != null)

  useEffect(() => {
    const { '@pizzabyte.token': token } = parseCookies()

    const getUser = async () => {
      const { user: userRaw } = (await api.get('/user/me', { params: { userId: user?.id } })).data

      if (userRaw == null) {
        signOut()
      }

      setUser({
        id: userRaw.id,
        email: userRaw.email,
        name: userRaw.name
      })
    }
    if (token?.length > 0 && isAuth) {
      getUser().catch(() => signOut())
    }
  }, [])

  async function signIn ({ email, password }: SignInProps): Promise<void> {
    try {
      const data: { token: string, user: UserProps } = (await api.post('/user/login', {
        email,
        password
      })).data

      const { user: userRaw, token } = data

      setCookie(undefined, '@pizzabyte.token', token, {
        maxAge: 60 * 60 * 24 * 30,
        path: '/'
      })

      setUser({
        id: userRaw.id,
        email: userRaw.email,
        name: userRaw.name

      })
      api.defaults.headers['x-api-key'] = token
      toast.success('Logged in')

      await Router.push('/dashboard')
    } catch (err: any) {
      toast.error(err.response.data.message)
    }
  }
  return (
    <AuthContext.Provider value={{ user, isAuth, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return {
    props: {}
  }
}
