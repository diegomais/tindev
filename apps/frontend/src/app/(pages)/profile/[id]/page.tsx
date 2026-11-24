import { redirect } from 'next/navigation'

import ProfileTemplate from '@/templates/profile'

interface Props {
  params: Promise<{ id: string }>
}

export default async function ProfilePage({ params }: Props) {
  const id = (await params).id

  if (!id) {
    redirect('/')
  }

  return <ProfileTemplate userId={Array.isArray(id) ? id[0] : id} />
}
