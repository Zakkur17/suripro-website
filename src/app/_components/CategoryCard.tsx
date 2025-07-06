import { Card, CardContent } from '@/components/ui/card'
import { LayoutGrid } from 'lucide-react'
import Link from 'next/link'

interface CategoryCardProps {
  category: {
    id: number
    name: string
  }
}

export const CategoryCard = ({ category }: CategoryCardProps) => {
  return (
    <Link href={`/profiles?category=${category.id}`}>
      <Card className="hover:bg-gray-800 transition-colors cursor-pointer group border-gray-600">
        <CardContent className="flex flex-col items-center justify-center p-6">
          <LayoutGrid className="h-8 w-8 mb-2 text-gray-400 group-hover:text-gray-200 transition-colors" />
          <span className="font-semibold text-center group-hover:text-gray-200 transition-colors">
            {category.name}
          </span>
        </CardContent>
      </Card>
    </Link>
  )
}
