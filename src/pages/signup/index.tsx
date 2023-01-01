import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import logoImg from '@/public/logo.svg'
import styles from '@/styles/home.module.scss'
import { Input } from '@/src/components/ui/Input'
import { Button } from '@/src/components/ui/Button'

export default function SignUp () {
  return (
    <>
    <div>
        <Head>
          <title>
            Cadastro
          </title>
        </Head>
    </div>
      <div className={styles.containerCenter}>

        <Image src={logoImg} alt="logo"/>

        <div className={styles.login}>

          <h1>Cadastro</h1>
          <form>
            <Input placeholder="Digite seu nome" type="text"
              />
            <Input placeholder="Digite seu email" type="text"
              />
            <Input placeholder="Digite sua senha"
              type="password"
              />
            <Input placeholder="confirme sua senha"
              type="password"
              />
            <Button
              type="submit"
              loading={false}
            >
            Cadastrar
            </Button>

            <Link href="/" className={styles.text}>
              Já possui uma conta? Faça login.
            </Link>

          </form>
        </div>
      </div>
      </>
  )
}
