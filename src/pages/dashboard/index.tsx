import { Header } from '@/src/components/ui/Header'
import { canSSRAuth } from '@/src/utils/canSSRAuth'

import Head from 'next/head'

export default function Dashboard () {
  return (
    <>
      <Head>
        <title>Pane</title>
      </Head>
    <div>
        <Header/>
      <h1>Dashboard</h1>
    </div>
    </>
  )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
  return {
    props: {}
  }
})
