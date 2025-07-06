import type { Metadata } from 'next/types'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { Profile, Category } from '@/payload-types'
import React from 'react'
import { ProfileCard } from '@/components/ProfileCard'
import { SearchFilterForm } from '@/app/_components/SearchFilterForm'

export const dynamic = 'force-dynamic'

interface ProfilesPageProps {
  searchParams: Promise<{
    search?: string
    category?: string
  }>
}

async function getProfiles(search?: string, category?: string): Promise<Profile[]> {
  const payload = await getPayload({ config: configPromise })

  const whereConditions = []

  if (search) {
    whereConditions.push({
      or: [
        {
          displayName: {
            contains: search,
          },
        },
        {
          bio: {
            contains: search,
          },
        },
      ],
    })
  }

  if (category) {
    whereConditions.push({
      category: {
        equals: parseInt(category, 10),
      },
    })
  }

  const allProfiles = await payload.find({
    collection: 'profiles',
    where: whereConditions.length > 0 ? { and: whereConditions } : undefined,
    limit: 100,
    depth: 2, // Ensure category data is populated
  })

  return allProfiles.docs
}

async function getCategories(): Promise<Category[]> {
  const payload = await getPayload({ config: configPromise })

  const categories = await payload.find({
    collection: 'categories',
    limit: 100,
    sort: 'name',
  })

  return categories.docs
}

export default async function ProfilesPage({ searchParams }: ProfilesPageProps) {
  const { search, category } = await searchParams
  const [profiles, categories] = await Promise.all([getProfiles(search, category), getCategories()])

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Freelancer Profiles</h1>

      <SearchFilterForm categories={categories} />

      {profiles.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">
            {search || category
              ? 'No profiles found matching your criteria.'
              : 'No profiles found.'}
          </p>
          {(search || category) && (
            <p className="text-gray-500 mt-2">
              Try adjusting your search terms or removing filters.
            </p>
          )}
        </div>
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
