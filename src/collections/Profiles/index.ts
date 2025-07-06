import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'

export const Profiles: CollectionConfig = {
  slug: 'profiles',
  access: {
    admin: authenticated,
    create: authenticated,
    delete: authenticated,
    read: authenticated,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['displayName', 'user'],
    useAsTitle: 'displayName',
  },
  fields: [
    {
      name: 'displayName',
      type: 'text',
      required: true,
    },
    {
      name: 'bio',
      type: 'textarea',
      required: false,
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
