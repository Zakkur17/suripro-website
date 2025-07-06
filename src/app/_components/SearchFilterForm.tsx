'use client'

import { useEffect, useRef } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useFormState } from 'react-dom'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Search, X } from 'lucide-react'
import { Category } from '@/payload-types'
import { searchProfiles } from '@/app/actions'

interface SearchFilterFormProps {
  categories: Category[]
}

export function SearchFilterForm({ categories }: SearchFilterFormProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const formRef = useRef<HTMLFormElement>(null)

  const [_state, formAction] = useFormState(searchProfiles, null)

  // Get current values from URL for default values
  const currentSearch = searchParams.get('search') || ''
  const currentCategory = searchParams.get('category') || 'all'

  // Handle category change by triggering form submission
  useEffect(() => {
    const form = formRef.current
    if (!form) return

    const handleCategoryChange = (e: Event) => {
      const target = e.target as HTMLSelectElement
      if (target.name === 'category') {
        form.requestSubmit()
      }
    }

    form.addEventListener('change', handleCategoryChange)
    return () => {
      form.removeEventListener('change', handleCategoryChange)
    }
  }, [])

  const clearFilters = () => {
    router.push('/profiles')
  }

  const hasActiveFilters = currentSearch.trim() || (currentCategory && currentCategory !== 'all')

  return (
    <div className="bg-gray-900/50 p-6 rounded-lg border border-gray-700 mb-8">
      <form ref={formRef} action={formAction} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Search Input */}
          <div className="space-y-2">
            <Label htmlFor="search">Search Profiles</Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                id="search"
                name="search"
                type="text"
                placeholder="Search by name or bio..."
                defaultValue={currentSearch}
                className="pl-10"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="space-y-2">
            <Label htmlFor="category">Filter by Category</Label>
            <Select name="category" defaultValue={currentCategory}>
              <SelectTrigger>
                <SelectValue placeholder="All categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id.toString()}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
          <Button type="submit" className="flex-1 md:flex-none">
            <Search className="h-4 w-4 mr-2" />
            Search
          </Button>

          {hasActiveFilters && (
            <Button
              type="button"
              variant="outline"
              onClick={clearFilters}
              className="flex-1 md:flex-none"
            >
              <X className="h-4 w-4 mr-2" />
              Clear Filters
            </Button>
          )}
        </div>
      </form>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="mt-4 pt-4 border-t border-gray-700">
          <p className="text-sm text-gray-400 mb-2">Active filters:</p>
          <div className="flex flex-wrap gap-2">
            {currentSearch.trim() && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-900/50 text-blue-300 rounded-full text-xs">
                Search: &quot;{currentSearch}&quot;
              </span>
            )}
            {currentCategory && currentCategory !== 'all' && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-900/50 text-green-300 rounded-full text-xs">
                Category:{' '}
                {categories.find((c) => c.id.toString() === currentCategory)?.name || 'Unknown'}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
