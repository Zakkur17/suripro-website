import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-md mx-auto text-center">
        <CardHeader>
          <CardTitle className="text-2xl text-red-600">Profile Not Found</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-4">
            Sorry, we couldn&apos;t find the profile you&apos;re looking for.
          </p>
          <Link href="/profiles" className="text-blue-600 hover:text-blue-800 underline">
            Back to All Profiles
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}
