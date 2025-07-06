import Link from 'next/link'
import Image from 'next/image'
import { Profile, Media } from '@/payload-types'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

interface ProfileCardProps {
  profile: Profile
}

export function ProfileCard({ profile }: ProfileCardProps) {
  const profilePicture = profile.profilePicture as Media

  return (
    <Link href={`/profiles/${profile.id}`} className="block transition-transform hover:scale-105">
      <Card className="h-full hover:shadow-lg transition-shadow">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
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
                  className="w-8 h-8 text-gray-400"
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
          <CardTitle className="text-xl">{profile.displayName}</CardTitle>
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
