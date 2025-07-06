import type { Metadata } from 'next/types'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { Profile } from '@/payload-types'
import { notFound } from 'next/navigation'
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export const dynamic = 'force-static'
export const revalidate = 600

interface ProfileDetailPageProps {
  params: Promise<{
    id: string
  }>
}

async function getProfile(id: string): Promise<Profile | null> {
  const payload = await getPayload({ config: configPromise })

  try {
    const profile = await payload.findByID({
      collection: 'profiles',
      id,
      depth: 1, // Include user relationship data
    })

    return profile
  } catch (_error) {
    return null
  }
}

export default async function ProfileDetailPage({ params }: ProfileDetailPageProps) {
  const { id } = await params
  const profile = await getProfile(id)

  if (!profile) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl">{profile.displayName}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="prose max-w-none">
            {profile.bio ? (
              <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">{profile.bio}</div>
            ) : (
              <p className="text-gray-500 italic">No bio available</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export async function generateMetadata({ params }: ProfileDetailPageProps): Promise<Metadata> {
  const { id } = await params
  const profile = await getProfile(id)

  if (!profile) {
    return {
      title: 'Profile not found',
    }
  }

  return {
    title: `${profile.displayName} - Freelancer Profile`,
    description: profile.bio
      ? profile.bio.substring(0, 160)
      : `View ${profile.displayName}'s freelancer profile`,
  }
}
