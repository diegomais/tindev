import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import io from 'socket.io-client'
import api from '../../services/api'
import styles from './styles.module.css'

type MainProps = {
  userId: string
}

type DevType = {
  _id: string
  avatar: string
  bio: string
  name: string
}

export default function Main({ userId }: MainProps) {
  const [users, setUsers] = useState<Array<DevType>>([])
  const [matchDev, setMatchDev] = useState<DevType | null>(null)

  useEffect(() => {
    async function loadUsers() {
      const response = await api.get('/devs', { headers: { user: userId } })

      setUsers(response.data)
    }

    loadUsers()
  }, [userId])

  useEffect(() => {
    const socket = io(
      process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3333',
      { query: { user: userId } },
    )

    socket.on('match', (dev: DevType) => {
      setMatchDev(dev)
    })
  }, [userId])

  async function handleLike(id: string) {
    await api.post(`/devs/${id}/likes`, null, { headers: { user: userId } })

    setUsers(users.filter((user) => user._id !== id))
  }

  async function handleDislike(id: string) {
    await api.post(`/devs/${id}/dislikes`, null, { headers: { user: userId } })

    setUsers(users.filter((user) => user._id !== id))
  }

  return (
    <div className={styles.main}>
      <Link href="/">
        <Image
          src="/images/logo.svg"
          alt="TinDev Logo"
          width={97}
          height={34}
        />
      </Link>
      {users.length > 0 ? (
        <ul>
          {users.map((user) => (
            <li key={user._id}>
              <Image
                src={user.avatar}
                alt={user.name}
                width={200}
                height={200}
              />
              <footer>
                <strong>{user.name}</strong>
                <p>{user.bio}</p>
              </footer>
              <div className={styles.buttons}>
                <button type="button" onClick={() => handleDislike(user._id)}>
                  <Image
                    src="/images/dislike.svg"
                    alt="Dislike"
                    width={20}
                    height={20}
                  />
                </button>
                <button type="button" onClick={() => handleLike(user._id)}>
                  <Image
                    src="/images/like.svg"
                    alt="Like"
                    width={24}
                    height={20}
                  />
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className={styles.empty}>Empty :(</div>
      )}

      {!!matchDev && (
        <div className={styles.match}>
          <Image
            src="/images/its-a-match.png"
            alt="It's a Match"
            width={331}
            height={80}
          />

          <Image
            className={styles.avatar}
            src={matchDev.avatar}
            alt="Avatar"
            width={200}
            height={200}
          />
          <strong>{matchDev.name}</strong>
          <p>{matchDev.bio}</p>

          <button type="button" onClick={() => setMatchDev(null)}>
            Close
          </button>
        </div>
      )}
    </div>
  )
}
