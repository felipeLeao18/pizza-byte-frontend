import { Input } from '@/src/components/ui/Input'
import { FormEvent, useState } from 'react'

import { Header } from '@/src/components/ui/Header'
import Head from 'next/head'
import styles from './styles.module.scss'
import { Button } from '@/src/components/ui/Button'
import { api } from '@/src/services/apiClient'
import { toast } from 'react-toastify'

export default function Category () {
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit (event: FormEvent) {
    event.preventDefault()

    setLoading(true)

    const data = (await api.post('/categories', {
      name
    })).data

    setLoading(false)

    if (data.id !== null) {
      toast.success('Category registered')
      setName('')
      return
    }

    toast.error('Fail registering category')
  }
  return (
  <>

    <Head>
      <title>
        Create category
      </title>
      </Head>

      <div>
      <Header/>

      <main className={styles.container}>

      <h1>Create Category</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
            <Input placeholder="Enter category name" type="text"
              className={styles.input}
              value={name}
              onChange={(e) => setName(e.target.value)}
              />

          <Button type="submit" className={styles.buttonSubmit} loading={loading}>

              Create
          </Button>
        </form>
      </main>
      </div>
  </>
  )
}
