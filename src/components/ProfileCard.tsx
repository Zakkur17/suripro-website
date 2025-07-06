import Link from 'next/link'
import Image from 'next/image'
import { Profile, Media, Category } from '@/payload-types'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
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
    <Link href={`/profiles/${profile.id}`} className="block transition-transform hover:scale-105">
      <Card className="h-full hover:shadow-lg transition-shadow">
        {/* Portfolio Images Carousel */}
        <div className="relative">
          {portfolioImages && portfolioImages.length > 0 ? (
            <Carousel className="w-full">
              <CarouselContent>
                {portfolioImages.map((image, index) => (
                  <CarouselItem key={image.id}>
                    <div className="relative h-48 w-full">
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
              <CarouselPrevious className="left-2" />
              <CarouselNext className="right-2" />
            </Carousel>
          ) : (
            <div className="h-48 bg-gray-200 rounded-t-lg flex items-center justify-center">
              <svg
                className="w-16 h-16 text-gray-400"
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
          <div className="flex items-center justify-center gap-3 mb-2">
            {profilePicture && typeof profilePicture === 'object' && profilePicture.url ? (
              <Image
                src={profilePicture.url}
                alt={profilePicture.alt || `${profile.displayName}'s profile picture`}
                width={40}
                height={40}
                className="rounded-full object-cover"
              />
            ) : (
              <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-gray-400"
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
            <CardTitle className="text-lg">{profile.displayName}</CardTitle>
          </div>

          {category && typeof category === 'object' && category.name && (
            <div className="mb-2">
              <Badge variant="secondary">{category.name}</Badge>
            </div>
          )}
        </CardHeader>
        <CardContent>
          <CardDescription className="line-clamp-3 text-center">
            {profile.bio || 'No bio available'}
          </CardDescription>
        </CardContent>
      </Card>
    </Link>
  )
}
