import type { Metadata } from 'next/types'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { Profile, Media, Category } from '@/payload-types'
import { notFound } from 'next/navigation'
import React from 'react'
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

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
      depth: 2, // Include category and user relationship data
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

  const profilePicture = profile.profilePicture as Media
  const category = profile.category as Category

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-6">
            {profilePicture && typeof profilePicture === 'object' && profilePicture.url ? (
              <Image
                src={profilePicture.url}
                alt={profilePicture.alt || `${profile.displayName}'s profile picture`}
                width={150}
                height={150}
                className="rounded-full object-cover"
              />
            ) : (
              <div className="w-36 h-36 bg-gray-200 rounded-full flex items-center justify-center">
                <svg
                  className="w-16 h-16 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            )}
          </div>
          {category && typeof category === 'object' && category.name && (
            <div className="mb-4">
              <Badge variant="default" className="text-lg px-4 py-2">
                {category.name}
              </Badge>
            </div>
          )}
          <CardTitle className="text-3xl">{profile.displayName}</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Contact Information */}
          {(profile.contactInfo?.email || profile.contactInfo?.phone) && (
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-semibold mb-3">Contact Information</h3>
              <div className="space-y-2">
                {profile.contactInfo.email && (
                  <div className="flex items-center">
                    <svg
                      className="w-5 h-5 text-gray-500 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                    <a
                      href={`mailto:${profile.contactInfo.email}`}
                      className="text-blue-600 hover:underline"
                    >
                      {profile.contactInfo.email}
                    </a>
                  </div>
                )}
                {profile.contactInfo.phone && (
                  <div className="flex items-center">
                    <svg
                      className="w-5 h-5 text-gray-500 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                    <a
                      href={`tel:${profile.contactInfo.phone}`}
                      className="text-blue-600 hover:underline"
                    >
                      {profile.contactInfo.phone}
                    </a>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Bio */}
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
