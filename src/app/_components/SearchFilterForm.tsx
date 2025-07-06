'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
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

interface SearchFilterFormProps {
  categories: Category[]
}

export function SearchFilterForm({ categories }: SearchFilterFormProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('')

  // Initialize form values from URL params
  useEffect(() => {
    const search = searchParams.get('search') || ''
    const category = searchParams.get('category') || ''

    setSearchTerm(search)
    setSelectedCategory(category)
  }, [searchParams])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    updateURL()
  }

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value)

    const params = new URLSearchParams(searchParams)
    if (value === 'all') {
      params.delete('category')
    } else {
      params.set('category', value)
    }

    const newPath = params.toString() ? `/profiles?${params.toString()}` : '/profiles'
    router.push(newPath)
  }

  const updateURL = () => {
    const params = new URLSearchParams()

    if (searchTerm.trim()) {
      params.set('search', searchTerm.trim())
    }

    if (selectedCategory && selectedCategory !== 'all') {
      params.set('category', selectedCategory)
    }

    const queryString = params.toString()
    const newURL = queryString ? `/profiles?${queryString}` : '/profiles'

    router.push(newURL)
  }

  const clearFilters = () => {
    setSearchTerm('')
    setSelectedCategory('all')
    router.push('/profiles')
  }

  const hasActiveFilters = searchTerm.trim() || selectedCategory

  return (
    <div className="bg-gray-900/50 p-6 rounded-lg border border-gray-700 mb-8">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Search Input */}
          <div className="space-y-2">
            <Label htmlFor="search">Search Profiles</Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                id="search"
                type="text"
                placeholder="Search by name or bio..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="space-y-2">
            <Label htmlFor="category">Filter by Category</Label>
            <Select value={selectedCategory} onValueChange={handleCategoryChange}>
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
        <div className="mt-4 pt-4 border-t">
          <p className="text-sm text-gray-600 mb-2">Active filters:</p>
          <div className="flex flex-wrap gap-2">
            {searchTerm.trim() && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                Search: &quot;{searchTerm}&quot;
              </span>
            )}
            {selectedCategory && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                Category:{' '}
                {categories.find((c) => c.id.toString() === selectedCategory)?.name || 'Unknown'}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
