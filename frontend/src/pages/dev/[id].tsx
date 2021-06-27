import { useRouter } from 'next/router'
import { useEffect } from 'react'
import MainTemplate from '../../templates/main'

export default function MainPage() {
  const router = useRouter()
  const { id } = router.query

  useEffect(() => {
    if (!id) {
      router.push('/')
    }
  }, [id, router])

  if (!id) {
    return null
  }

  return <MainTemplate userId={Array.isArray(id) ? id[0] : id} />
}
