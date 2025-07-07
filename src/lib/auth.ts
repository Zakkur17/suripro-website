import { getServerSession } from 'next-auth'
import { authOptions } from './auth-config'
import { redirect } from 'next/navigation'

export async function getCurrentUser() {
  const session = await getServerSession(authOptions)
  return session?.user || null
}

export async function requireAuth() {
  const user = await getCurrentUser()
  if (!user) {
    redirect('/api/auth/signin')
  }
  return user
}

export async function requireFreelancer() {
  const user = await requireAuth()
  if (user.role !== 'freelancer') {
    redirect('/')
  }
  return user
}
