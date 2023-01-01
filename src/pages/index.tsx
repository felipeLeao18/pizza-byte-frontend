import Head from 'next/head'
import Image from 'next/image'
import styles from '../../styles/home.module.scss'
import logoImg from '../../public/logo.svg'
import { Input } from '../components/ui/Input'
import { Button } from '../components/ui/Button'

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
              loading={true}
            >
            login
            </Button>
          </form>
        </div>
      </div>
      </>
  )
}
