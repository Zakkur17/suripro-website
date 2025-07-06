import type { Metadata } from 'next/types'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { Profile, Media, Category } from '@/payload-types'
import { notFound } from 'next/navigation'
import React from 'react'
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'

export const dynamic = 'force-dynamic'

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
  const portfolioImages = profile.portfolioImages as Media[]

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-4xl mx-auto">
          {/* Portfolio Images Carousel */}
          <div className="relative mb-6">
            {portfolioImages && portfolioImages.length > 0 ? (
              <Carousel className="w-full">
                <CarouselContent>
                  {portfolioImages.map((image, index) => (
                    <CarouselItem key={image.id}>
                      <div className="relative h-96 w-full">
                        {image.url && (
                          <Image
                            src={image.url}
                            alt={image.alt || `Portfolio image ${index + 1}`}
                            fill
                            className="object-cover rounded-t-lg"
                          />
                        )}
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-4" />
                <CarouselNext className="right-4" />
              </Carousel>
            ) : (
              <div className="h-96 bg-gray-200 rounded-t-lg flex items-center justify-center">
                <svg
                  className="w-24 h-24 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            )}
          </div>

          <CardHeader className="text-center">
            {/* Profile Picture and Name */}
            <div className="flex items-center justify-center gap-4 mb-6">
              {profilePicture && typeof profilePicture === 'object' && profilePicture.url ? (
                <Image
                  src={profilePicture.url}
                  alt={profilePicture.alt || `${profile.displayName}'s profile picture`}
                  width={80}
                  height={80}
                  className="rounded-full object-cover"
                />
              ) : (
                <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
                  <svg
                    className="w-10 h-10 text-gray-400"
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
              <CardTitle className="text-3xl">{profile.displayName}</CardTitle>
            </div>

            {category && typeof category === 'object' && category.name && (
              <div className="mb-4">
                <Badge variant="default" className="text-lg px-4 py-2">
                  {category.name}
                </Badge>
              </div>
            )}
          </CardHeader>
          <CardContent>
            {/* Contact Information */}
            {(profile.contactInfo?.email || profile.contactInfo?.phone) && (
              <div className="mb-6 p-4 bg-gray-800 rounded-lg border border-gray-700">
                <h3 className="text-lg font-semibold mb-3 text-foreground">Contact Information</h3>
                <div className="space-y-2">
                  {profile.contactInfo.email && (
                    <div className="flex items-center">
                      <svg
                        className="w-5 h-5 text-gray-400 mr-2"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                      <a
                        href={`mailto:${profile.contactInfo.email}`}
                        className="text-blue-400 hover:underline"
                      >
                        {profile.contactInfo.email}
                      </a>
                    </div>
                  )}
                  {profile.contactInfo.phone && (
                    <div className="flex items-center">
                      <svg
                        className="w-5 h-5 text-gray-400 mr-2"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                      </svg>
                      <a
                        href={`tel:${profile.contactInfo.phone}`}
                        className="text-blue-400 hover:underline"
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
                <div className="whitespace-pre-wrap text-muted-foreground leading-relaxed">
                  {profile.bio}
                </div>
              ) : (
                <p className="text-muted-foreground italic">No bio available</p>
              )}
            </div>

            {/* Services Offered */}
            {profile.services && profile.services.length > 0 && (
              <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4 text-foreground">Services Offered</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  {profile.services.map((service, index) => (
                    <Card key={index} className="border border-gray-200">
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-3">
                          <h4 className="text-lg font-semibold text-foreground">
                            {service.serviceName}
                          </h4>
                          <span className="text-2xl font-bold text-green-600">
                            ${service.price}
                          </span>
                        </div>
                        <p className="text-muted-foreground leading-relaxed">
                          {service.serviceDescription}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
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
