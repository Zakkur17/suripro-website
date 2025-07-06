import type { Metadata } from 'next/types'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { Profile, Category } from '@/payload-types'
import React from 'react'
import Link from 'next/link'
import { SearchFilterForm } from '@/app/_components/SearchFilterForm'
import { CategoryCard } from '@/app/_components/CategoryCard'
import { ProfileCard } from '@/components/ProfileCard'

export const dynamic = 'force-dynamic'

async function getFeaturedProfiles(): Promise<Profile[]> {
  const payload = await getPayload({ config: configPromise })
  
  const allProfilesResult = await payload.find({
    collection: 'profiles',
    limit: 100,
    depth: 2, // To populate profilePicture and category
  })
  
  // Shuffle the profiles and return first 4
  const shuffled = allProfilesResult.docs.sort(() => 0.5 - Math.random())
  return shuffled.slice(0, 4)
}

async function getCategories(): Promise<Category[]> {
  const payload = await getPayload({ config: configPromise })
  
  const categories = await payload.find({
    collection: 'categories',
    limit: 100,
    sort: 'name',
  })
  
  return categories.docs
}

export default async function HomePage() {
  const [featuredProfiles, categories] = await Promise.all([
    getFeaturedProfiles(),
    getCategories(),
  ])

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Connecting clients in need to freelancers who deliver
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto">
            Find the perfect professional for your project, right here in Suriname.
          </p>
          
          {/* Search Form as Hero CTA */}
          <div className="max-w-4xl mx-auto">
            <SearchFilterForm categories={categories} />
          </div>
        </div>
      </section>

      {/* Browse by Category Section */}
      <section className="py-16 px-4 bg-gray-800">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Explore millions of pros
          </h2>
          
          {categories.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {categories.map((category) => (
                <CategoryCard key={category.id} category={category} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">No categories found.</p>
            </div>
          )}
        </div>
      </section>

      {/* Featured Freelancers Section */}
      <section className="py-16 px-4 bg-gray-900">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Real results from clients
          </h2>
          
          {featuredProfiles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProfiles.map((profile) => (
                <ProfileCard key={profile.id} profile={profile} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">No featured profiles found.</p>
            </div>
          )}
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to find your perfect freelancer?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Join thousands of satisfied clients who found their ideal professional on our platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/profiles"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-center"
            >
              Browse All Profiles
            </Link>
            <Link
              href="/profiles"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors text-center"
            >
              Start Your Search
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export const metadata: Metadata = {
  title: 'SuriPro - Find Professional Freelancers in Suriname',
  description: 'Connect with talented freelancers in Suriname. Find the perfect professional for your project from our curated marketplace of skilled professionals.',
}
