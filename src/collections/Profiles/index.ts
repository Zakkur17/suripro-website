import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { anyone } from '../../access/anyone'

export const Profiles: CollectionConfig = {
  slug: 'profiles',
  access: {
    admin: authenticated,
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['displayName', 'category', 'user'],
    useAsTitle: 'displayName',
    listSearchableFields: ['displayName', 'bio'],
  },
  fields: [
    {
      name: 'displayName',
      type: 'text',
      required: true,
    },
    {
      name: 'profilePicture',
      type: 'upload',
      relationTo: 'media',
      required: false,
    },
    {
      name: 'portfolioImages',
      label: 'Portfolio Images',
      type: 'upload',
      relationTo: 'media',
      hasMany: true,
      admin: {
        description:
          'Upload images to showcase your work. The first image will be the primary one.',
      },
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
      required: true,
    },
    {
      name: 'bio',
      type: 'textarea',
      required: false,
    },
    {
      name: 'services',
      label: 'Service Packages',
      type: 'array',
      minRows: 1,
      fields: [
        {
          name: 'serviceName',
          type: 'text',
          required: true,
          label: 'Service Name (e.g., Basic Logo Design)',
        },
        {
          name: 'serviceDescription',
          type: 'textarea',
          required: true,
          label: 'What is included in this service?',
        },
        {
          name: 'price',
          type: 'number',
          required: true,
          label: 'Price (in USD)',
          admin: {
            description: 'Enter the price for this service package.',
          },
        },
      ],
    },
    {
      name: 'contactInfo',
      type: 'group',
      fields: [
        {
          name: 'email',
          type: 'email',
        },
        {
          name: 'phone',
          type: 'text',
        },
      ],
    },
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
      },
    },
  ],
  timestamps: true,
}
