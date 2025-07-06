'use server'

import { redirect } from 'next/navigation'

export async function searchProfiles(prevState: unknown, formData: FormData) {
  const search = formData.get('search') as string
  const category = formData.get('category') as string

  const params = new URLSearchParams()

  if (search && search.trim()) {
    params.set('search', search.trim())
  }

  if (category && category !== 'all') {
    params.set('category', category)
  }

  const queryString = params.toString()
  const newUrl = queryString ? `/profiles?${queryString}` : '/profiles'

  redirect(newUrl)
}
