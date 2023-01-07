import Head from 'next/head'
import Image from 'next/image'
import styles from '../../styles/home.module.scss'
import logoImg from '../../public/logo.svg'
import Link from 'next/link'
import { Input } from '@/src/components/ui/Input'
import { Button } from '@/src/components/ui/Button'
import { FormEvent, useContext, useState } from 'react'
import { AuthContext } from '@/src/contexts/AuthContext'
import { canSSRGuest } from '../utils/canSSRGuest'
import { toast } from 'react-toastify'

export default function Home () {
  const { signIn } = useContext(AuthContext)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleLogin (event: FormEvent) {
    event.preventDefault()

    if (email === '' || (password === '')) {
      toast.error('Enter email and password')
    }

    setLoading(true)
    await signIn({ email, password })
    setLoading(false)
  }
  return (
    <>
    <div>
        <Head>
          <title>
            Login
          </title>
        </Head>
    </div>
      <div className={styles.containerCenter}>

        <Image src={logoImg} alt="logo"/>

        <div className={styles.login}>
          <form onSubmit={handleLogin}>
            <Input placeholder="Digite seu email" type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              />
            <Input placeholder="Digite sua senha"
              type="password"
              value={password}

              onChange={(e) => setPassword(e.target.value)}
              />
            <Button
              type="submit"

              loading = {loading}
            >
            login
            </Button>

            <Link href="/signup" className={styles.text}>
              Não possui uma conta? Cadastre-se
            </Link>

          </form>
        </div>
      </div>
      </>
  )
}

export const getServerSideProps = canSSRGuest(async (ctx) => {
  return {
    props: {}
  }
})
