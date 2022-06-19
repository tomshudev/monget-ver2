import { ApolloProvider } from '@apollo/client'
import { SessionProvider, useSession } from 'next-auth/react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import LeftSidebar from '../components/LeftSidebar/LeftSidebar'
import RightSidebar from '../components/RightSidebar/RightSidebar'
import apolloClient from '../lib/apollo'
import '../styles/globals.css'

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <ApolloProvider client={apolloClient}>
      <SessionProvider session={session}>
        <ApplicationSkeleton>
          <RouteGuard>
            <Component {...pageProps} />
          </RouteGuard>
        </ApplicationSkeleton>
      </SessionProvider>
    </ApolloProvider>
  )
}

const RouteGuard = ({ children }) => {
  const router = useRouter()
  const session = useSession()
  const [authorized, setAuthorized] = useState(false)

  const validateAuthentication = () => {
    if (router.pathname !== '/login') {
      if (!session || session.status === 'unauthenticated') {
        setAuthorized(false)
        router.push('/login')
      } else {
        setAuthorized(true)
      }
    } else {
      setAuthorized(true)
    }
  }

  useEffect(() => {
    validateAuthentication()

    router.events.on('routeChangeComplete', validateAuthentication)

    return () => {
      router.events.off('routeChangeComplete', validateAuthentication)
    }
  }, [router, validateAuthentication])

  return authorized && children
}

const ApplicationSkeleton = ({ children }) => {
  return (
    <div>
      <Head>
        <title>Monget - Manage your expenses</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="max-w-[1700px] min-h-screen flex mx-auto text-[#d9d9d9]">
        <div className="m-10 glass w-full rounded-[40px] overflow-hidden flex font-josefin">
          <LeftSidebar />
          <div className="w-full py-4">{children}</div>
          <RightSidebar />
        </div>
      </main>
    </div>
  )
}

export default MyApp
