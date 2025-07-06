import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payload-config'
import bcrypt from 'bcryptjs'
import type { User } from '@/payload-types'

// Extend the NextAuth User type to include role
declare module 'next-auth' {
  interface User {
    role?: string
  }

  interface Session {
    user: {
      id: string
      name?: string | null
      email?: string | null
      image?: string | null
      role?: string
    }
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    role?: string
  }
}

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        try {
          const payload = await getPayloadHMR({
            config: configPromise,
          })

          const user = await payload.find({
            collection: 'users',
            where: {
              email: {
                equals: credentials.email,
              },
            },
          })

          if (!user.docs.length) {
            return null
          }

          const foundUser = user.docs[0] as User

          // Check if password exists and is valid
          if (!foundUser.hash) {
            return null
          }

          const isValid = await bcrypt.compare(credentials.password, foundUser.hash)

          if (!isValid) {
            return null
          }

          return {
            id: foundUser.id.toString(),
            email: foundUser.email,
            name: foundUser.name,
            role: foundUser.role,
          }
        } catch (error) {
          console.error('Auth error:', error)
          return null
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
      }
      return token
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.sub as string
        session.user.role = token.role
      }
      return session
    },
  },
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
  },
})

export { handler as GET, handler as POST }
