import { ApolloProvider } from '@apollo/client'
import App, { AppProps } from 'next/app'
import Head from 'next/head'
import { useEffect } from 'react'
import apolloClient from '../lib/apollo'
import { unstable_subscribeToStore } from '../store/helpers/unstable_subscribeToStore'
import { useSubscribeToStores } from '../store/hooks/unstable_useUnsubscribeFromStores'
import { TOM_STORE } from './stam'
import '../styles/globals.css'
import Header from '../components/Header'
import {
  getProviders,
  getSession,
  SessionProvider,
  useSession,
} from 'next-auth/react'
import Login from '../components/Login'
import { useRouter } from 'next/router'

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  //   useSubscribeToStores()
  // const { Component, pageProps, session, providers } = props

  // console.log(props)

  //   if (!session) {
  //       return <Login providers={providers} />
  //   }

  return (
    <ApolloProvider client={apolloClient}>
      <SessionProvider session={session}>
        <ApplicationSkeleton>
          <Component {...pageProps} />
        </ApplicationSkeleton>
      </SessionProvider>
    </ApolloProvider>
  )
}

const ApplicationSkeleton = ({ children }) => {
  const routeer = useRouter()

  return (
    <div>
      <Head>
        <title>Monget - Manage your expenses</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="max-w-[1700px] min-h-screen flex mx-auto text-[#d9d9d9]">
        <div className="m-10 glass w-full rounded-[40px] overflow-hidden">
          {/* {routeer.pathname !== '/login' && <Header />} */}

          {children}
        </div>
      </main>
    </div>
  )
}

export default MyApp
