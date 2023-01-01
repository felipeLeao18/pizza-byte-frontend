import Head from 'next/head'
import Image from 'next/image'
import styles from '../../styles/home.module.scss'
import logoImg from '../../public/logo.svg'
import Link from 'next/link'
import { Input } from '@/src/components/ui/Input'
import { Button } from '@/src/components/ui/Button'

export default function Home () {
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
          <form>
            <Input placeholder="Digite seu email" type="text"
              />
            <Input placeholder="Digite sua senha"
              type="password"
              />
            <Button
              type="submit"
              loading={false}
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
