'use client'

import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import { Profile, Media, Category } from '@/payload-types'
import { Card, CardDescription, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'

interface ProfileCardProps {
  profile: Profile
}

export function ProfileCard({ profile }: ProfileCardProps) {
  const profilePicture = profile.profilePicture as Media
  const category = profile.category as Category
  const portfolioImages = profile.portfolioImages as Media[]

  return (
    <Card className="h-full flex flex-col overflow-hidden transition-shadow hover:shadow-lg">
      <Carousel
        className="w-full"
        opts={{
          loop: true, // Maakt de carousel eindeloos
        }}
      >
        <CarouselContent className="-ml-0">
          {' '}
          {/* DE FIX: -ml-0 om de negatieve marge te verwijderen */}
          {portfolioImages && portfolioImages.length > 0 ? (
            portfolioImages.map((image) => (
              <CarouselItem key={image.id} className="pl-0">
                {' '}
                {/* DE FIX: pl-0 om de padding te verwijderen */}
                <Link href={`/profiles/${profile.id}`} className="block h-48 w-full relative">
                  {image.url && (
                    <Image
                      src={image.url}
                      alt={image.alt || `Portfolio image for ${profile.displayName}`}
                      fill
                      className="object-cover" // Zorgt dat de afbeelding de ruimte vult
                    />
                  )}
                </Link>
              </CarouselItem>
            ))
          ) : (
            // Fallback als er geen portfolio images zijn
            <CarouselItem className="pl-0">
              <Link href={`/profiles/${profile.id}`} className="block h-48 w-full relative">
                <div className="h-full bg-muted flex items-center justify-center">
                  <svg
                    className="w-16 h-16 text-muted-foreground"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              </Link>
            </CarouselItem>
          )}
        </CarouselContent>
        {/* De knoppen zijn nu kinderen van de Carousel en werken correct */}
        <CarouselPrevious className="left-2" />
        <CarouselNext className="right-2" />
      </Carousel>

      {/* Informatie onder de carousel */}
      <div className="p-4 flex-grow flex flex-col">
        <div className="flex items-center gap-3 mb-2">
          {profilePicture?.url && (
            <Image
              src={profilePicture.url}
              alt={profilePicture.alt || `${profile.displayName}'s profile picture`}
              width={40}
              height={40}
              className="rounded-full object-cover"
            />
          )}
          <CardTitle className="text-lg">{profile.displayName}</CardTitle>
        </div>

        {category?.name && (
          <div className="mb-3">
            <Badge variant="secondary">{category.name}</Badge>
          </div>
        )}

        <CardDescription className="line-clamp-3 text-sm flex-grow">
          {profile.bio || 'No bio available.'}
        </CardDescription>
      </div>
    </Card>
  )
}
