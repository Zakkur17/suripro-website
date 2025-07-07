'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '../../../../payload.config'
import { requireFreelancer } from '../../../../lib/auth'

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

export async function updateProfile(prevState: unknown, formData: FormData) {
  try {
    // Verify the user is authenticated and is a freelancer
    const user = await requireFreelancer()

    const payload = await getPayloadHMR({ config: configPromise })

    // Get the profile ID from the form
    const profileId = formData.get('profileId') as string

    if (!profileId) {
      return { success: false, message: 'Profile ID is required' }
    }

    // Security check: Verify the user owns this profile
    const existingProfile = await payload.findByID({
      collection: 'profiles',
      id: profileId,
      depth: 1,
    })

    // Check if the profile's user field matches the current user
    const profileUserId =
      typeof existingProfile.user === 'object'
        ? existingProfile.user.id.toString()
        : existingProfile.user.toString()

    if (!existingProfile || profileUserId !== user.id) {
      return { success: false, message: 'Unauthorized: You can only edit your own profile' }
    }

    // Extract form data
    const displayName = formData.get('displayName') as string
    const bio = formData.get('bio') as string
    const email = formData.get('email') as string
    const phone = formData.get('phone') as string
    const category = formData.get('category') as string

    // Handle services array - this will be a more complex implementation
    const services = []
    let serviceIndex = 0
    while (formData.get(`services.${serviceIndex}.serviceName`)) {
      const serviceName = formData.get(`services.${serviceIndex}.serviceName`) as string
      const serviceDescription = formData.get(
        `services.${serviceIndex}.serviceDescription`,
      ) as string
      const price = parseFloat(formData.get(`services.${serviceIndex}.price`) as string)

      if (serviceName && serviceDescription && !isNaN(price)) {
        services.push({
          serviceName,
          serviceDescription,
          price,
        })
      }
      serviceIndex++
    }

    // Update the profile
    await payload.update({
      collection: 'profiles',
      id: profileId,
      data: {
        displayName,
        bio,
        contactInfo: {
          email,
          phone,
        },
        category: parseInt(category),
        services: services.length > 0 ? services : undefined,
      },
    })

    revalidatePath('/dashboard/my-profile')
    return { success: true, message: 'Profile updated successfully!' }
  } catch (error) {
    console.error('Error updating profile:', error)
    return { success: false, message: 'Failed to update profile' }
  }
}
