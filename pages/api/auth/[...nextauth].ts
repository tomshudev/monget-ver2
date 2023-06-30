import nextAuth, { DefaultSession } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import prisma from '../../../lib/what'
import { gql } from '@apollo/client'
import apolloClient from '../../../lib/apollo'

export type MongetSession = {
  user: {
    uid: string | undefined
  }
} & DefaultSession

const CreateUser = gql`
  mutation ($email: String!, $name: String!, $image: String) {
    createUser(email: $email, name: $name, image: $image) {
      id
    }
  }
`

export default nextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async session({ session }) {
      console.log({ session })

      if (!session || !session.user) return session

      console.log('going to create a user')

      const result = await apolloClient
        .mutate({
          mutation: CreateUser,
          variables: {
            email: session.user.email,
            name: session.user.name,
            image: session.user.image,
          },
        })
        .catch((e) => {
          console.error('failed to create or find a user', e)
          return undefined
        })

      console.log('found user', { result })

      // let user = await prisma.user.findUnique({
      //   where: {
      //     email: session.user.email!,
      //   },
      // })

      // if (!user) {
      //   user = await prisma.user.create({
      //     data: {
      //       email: session.user.email!,
      //       name: session.user.name!,
      //       image: session.user.image,
      //       role: 'USER',
      //     },
      //   })
      // }

      // ;(session as MongetSession).user.uid = user.id
      ;(session as MongetSession).user.uid =
        result?.data.createUser.id || undefined
      return session
    },
  },
})
