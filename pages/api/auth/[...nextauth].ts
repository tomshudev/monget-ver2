import nextAuth, { DefaultSession } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import prisma from '../../../lib/prisma'

export type MongetSession = {
    user: {
        uid: string | undefined
    }
}  & DefaultSession

export default nextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        })
    ],
    callbacks: {
        async session({session}) {
            if (!session || !session.user) return session;

            let user = await prisma.user.findUnique({
                where: {
                    email: session.user.email!
                }
            });

            if (!user) {
                user = await prisma.user.create({
                    data: {
                        email: session.user.email!,
                        name: session.user.name!,
                        image: session.user.image,
                        role: 'USER'
                    }
                })
            }

            (session as MongetSession).user.uid = user.id
            return session
        }
    },
})