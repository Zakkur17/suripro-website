import type { Metadata } from 'next/types'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { Profile } from '@/payload-types'
import React from 'react'
import { ProfileCard } from '@/components/ProfileCard'

export const dynamic = 'force-static'
export const revalidate = 600

async function getProfiles(): Promise<Profile[]> {
  const payload = await getPayload({ config: configPromise })

  const allProfiles = await payload.find({
    collection: 'profiles',
    limit: 100, // Fetch up to 100 profiles
    depth: 1, // Include user relationship data
  })

  return allProfiles.docs
}

export default async function ProfilesPage() {
  const profiles = await getProfiles()

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Freelancer Profiles</h1>

      {profiles.length === 0 ? (
        <p className="text-gray-600">No profiles found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {profiles.map((profile) => (
            <ProfileCard key={profile.id} profile={profile} />
          ))}
        </div>
      )}
    </div>
  )
}

export const metadata: Metadata = {
  title: 'Freelancer Profiles',
  description: 'Browse our talented freelancers and find the perfect match for your project.',
}
