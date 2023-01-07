
import { GetServerSidePropsResult, GetServerSideProps, GetServerSidePropsContext } from 'next'
import { destroyCookie, parseCookies } from 'nookies'
import { AuthTokenError } from '../services/errors/AuthTokenError'

export function canSSRGuest (fn: GetServerSideProps<Record<string, any>>) {
  return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<Record<string, any>> | undefined> => {
    const cookies = parseCookies(ctx)

    if (cookies['@pizzabyte.token']?.length === 0) {
      return {
        redirect: {
          destination: '/',
          permanent: false
        }
      }
    }
    try {
      return await fn(ctx)
    } catch (err) {
      if (err instanceof AuthTokenError) {
        destroyCookie(ctx, '@pizzabyte.token')

        return {
          redirect: {
            destination: '/',
            permanent: false
          }
        }
      }
    }
  }
}
