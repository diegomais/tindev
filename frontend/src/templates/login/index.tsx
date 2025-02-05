import Image from 'next/image'
import { useRouter } from 'next/router'
import { FormEvent, useState } from 'react'
import api from '../../services/api'
import styles from './styles.module.css'

export default function LoginTemplate() {
  const router = useRouter()
  const [username, setUsername] = useState('')

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const { data } = await api.post('/devs', { username })

    router.push(`/dev/${data._id}`)
  }

  return (
    <div className={styles.login}>
      <form onSubmit={handleSubmit}>
        <Image
          src="/images/logo.svg"
          alt="TinDev Logo"
          width={97}
          height={34}
        />
        <input
          placeholder="Enter your GitHub username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  )
}
