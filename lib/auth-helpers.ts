import 'server-only'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'

export type SessionUser = {
  id: string
  name: string
  email: string
  role?: string
}

export async function getSessionUser(): Promise<SessionUser | null> {
  try {
    const session = await auth.api.getSession({ 
      headers: await headers() 
    })
    return (session?.user as SessionUser) ?? null
  } catch {
    return null
  }
}

/** Throws if there is no signed-in user. Returns the user id. */
export async function requireUser(): Promise<SessionUser> {
  const user = await getSessionUser()
  if (!user) throw new Error('Unauthorized')
  return user
}

/** Throws unless the signed-in user has the admin role. */
export async function requireAdmin(): Promise<SessionUser> {
  const user = await getSessionUser()
  if (!user) throw new Error('Unauthorized')
  if (user.role !== 'admin') throw new Error('Forbidden')
  return user
}

export async function getSession(): Promise<SessionUser | null> {
  try {
    const session = await auth.api.getSession({ 
      headers: await headers() 
    })
    return (session?.user as SessionUser) ?? null
  } catch {
    return null
  }
}




