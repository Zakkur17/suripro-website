import Link from 'next/link'
import { Profile } from '@/payload-types'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

interface ProfileCardProps {
  profile: Profile
}

export function ProfileCard({ profile }: ProfileCardProps) {
  return (
    <Link href={`/profiles/${profile.id}`} className="block transition-transform hover:scale-105">
      <Card className="h-full hover:shadow-lg transition-shadow">
        <CardHeader>
          <CardTitle className="text-xl">{profile.displayName}</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="line-clamp-3">
            {profile.bio || 'No bio available'}
          </CardDescription>
        </CardContent>
      </Card>
    </Link>
  )
}
