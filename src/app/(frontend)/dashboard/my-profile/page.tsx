import { requireFreelancer } from '../../../../lib/auth'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '../../../../payload.config'
import { notFound } from 'next/navigation'
import { EditProfileForm } from './edit-profile-form'
import type { Profile, Category } from '../../../../payload-types'

export default async function MyProfilePage() {
  // Verify authentication and role
  const user = await requireFreelancer()

  const payload = await getPayloadHMR({ config: configPromise })

  // Find the user's profile
  const { docs: profiles } = await payload.find({
    collection: 'profiles',
    where: {
      'user.id': {
        equals: parseInt(user.id),
      },
    },
    depth: 2,
  })

  if (!profiles.length) {
    notFound()
  }

  const myProfile = profiles[0] as Profile

  // Get all categories for the select dropdown
  const { docs: categories } = await payload.find({
    collection: 'categories',
    limit: 100,
    sort: 'name',
  })

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Edit My Profile</h1>
          <EditProfileForm profile={myProfile} categories={categories as Category[]} />
        </div>
      </div>
    </div>
  )
}
