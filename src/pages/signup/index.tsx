import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import logoImg from '@/public/logo.svg'
import styles from '@/styles/home.module.scss'
import { Input } from '@/src/components/ui/Input'
import { Button } from '@/src/components/ui/Button'
import { FormEvent, useState } from 'react'
import { api } from '@/src/services/apiClient'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Router from 'next/router'
interface ISignUp {
  email: string
  name: string
  password: string
}

export default function SignUp () {
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')

  async function handleSubmit (event: FormEvent) {
    event.preventDefault()
    const user: ISignUp & { passwordConfirm: string } = {
      name,
      email,
      password,
      passwordConfirm
    }

    const allDataProvided = Object.values(user)?.every(value => value)
    console.log(allDataProvided)

    if (!allDataProvided) {
      toast.error('All fields are required')
      return
    }

    if (user.password !== user.passwordConfirm) {
      toast.error('Password confirmation failed')
      return
    }

    setLoading(true)
    try {
      const response = (await api.post('/user',
        { email: user.email, name: user.name, password: user.password }))
        .data

      const { user: userSignedUp } = response
      setLoading(false)
      if (userSignedUp !== null) {
        toast.success(`WELCOME ${user.name}`)
        await Router.push('/')
      }
    } catch (err: any) {
      console.log(err)

      setLoading(false)
      return toast.error(err.response.data.message)
    }

    // me ame
  }

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
          <form onSubmit={handleSubmit}>
            <Input placeholder="Digite seu nome" type="text"
              onChange={(e) => setName(e.target.value)}
              />
            <Input placeholder="Digite seu email" type="text"
              onChange={(e) => setEmail(e.target.value)}
              />
            <Input placeholder="Digite sua senha"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              />
            <Input placeholder="confirme sua senha"
              type="password"
              onChange={(e) => setPasswordConfirm(e.target.value)}
              />
            <Button
              type="submit"
              loading={loading}
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
