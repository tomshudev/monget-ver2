import { ApolloProvider } from '@apollo/client'
import { SessionProvider, useSession } from 'next-auth/react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import LeftSidebar from '../components/LeftSidebar/LeftSidebar'
import RightSidebar from '../components/RightSidebar/RightSidebar'
import apolloClient from '../lib/apollo'

import OneSignal from 'react-onesignal'
import '../styles/globals.css'

const firebaseConfig = {
  apiKey: 'AIzaSyAI-o8RGRE9H2-U_zhRksZZP-x7oKyb5vQ',
  authDomain: 'monget-c1663.firebaseapp.com',
  databaseURL: 'https://monget-c1663.firebaseio.com',
  projectId: 'monget-c1663',
  storageBucket: 'monget-c1663.appspot.com',
  messagingSenderId: '895070246342',
  appId: '1:895070246342:web:f55448fc63a11f1849cec7',
  measurementId: 'G-0VG2E9XT62',
}

async function runOneSignal() {
  await OneSignal.init({
    appId: '9bfa20e5-ef82-4414-ab19-329d49ef4928',
    allowLocalhostAsSecureOrigin: true,
  }).then(() => {
    OneSignal.getSubscription((isSubscribed) => {
      if (!isSubscribed) {
        OneSignal.setSubscription(true).then(() => {})
      }
    })
  })
}

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  // const [initialized, setInitialized] = useState(false)

  // useEffect(() => {
  //   window.OneSignal = window.OneSignal || [];
  // OneSignal.push(function() {
  //   OneSignal.init({
  //     appId: "9bfa20e5-ef82-4414-ab19-329d49ef4928",
  //   });
  // });
  // }, [])

  useEffect(() => {
    // const app = initializeApp(firebaseConfig)
    // const analytics = getAnalytics(app)
    // const messaging = getMessaging()
    // if ('serviceWorker' in navigator) {
    //   navigator.serviceWorker
    //     .register('firebase-messaging-sw.js')
    //     .then((register) => {
    //       console.log('Requesting permission...')
    //       Notification.requestPermission().then((permission) => {
    //         if (permission === 'granted') {
    //           console.log('Notification permission granted.')
    //           getToken(messaging, {
    //             vapidKey:
    //               'BJiosO36TlA1iyfJBA8kL7ggRmfF8spcBKRRmw30dW823BkjsxlYACbPkxyV7Ohcg3BRSaWUelHJ6y6AD5SD4Ic',
    //           }).then((token) => {
    //             console.log({ token })
    //             onMessage(messaging, (payload) => {
    //               console.log(payload)
    //             })
    //           })
    //         }
    //       })
    //     })
    // } else {
    //   console.log('Service Worker not supported')
    // }
    // onMessage(messaging, (what) => {
    //   console.log('here', what)
    // })
    // getToken(messaging, {
    //   vapidKey:
    //     'BJiosO36TlA1iyfJBA8kL7ggRmfF8spcBKRRmw30dW823BkjsxlYACbPkxyV7Ohcg3BRSaWUelHJ6y6AD5SD4Ic',
    // })
    //   .then((token) => {
    //     if (token) {
    //       console.log('current token: ', token)
    //     } else {
    //       console.log(
    //         'No registration token available. Request permission to generate one.'
    //       )
    //     }
    //   })
    //   .catch((e) => {
    //     console.log('An error occurred while retrieving token. ', e)
    //   })
    // OneSignalReact.init({
    //   appId: '9bfa20e5-ef82-4414-ab19-329d49ef4928',
    //   allowLocalhostAsSecureOrigin: true,
    // }).then(() => {
    //   console.log('OneSignal is initialized.')
    //   OneSignalReact.showSlidedownPrompt()
    // })
    // ;(window as any).OneSignal = (window as any).OneSignal || []
    // ;(window as any).OneSignal.push(function () {
    //   ;(window as any).OneSignal.init({
    //     appId: '9bfa20e5-ef82-4414-ab19-329d49ef4928',
    //     notifyButton: {
    //       enable: true,
    //     },
    //     allowLocalhostAsSecureOrigin: true,
    //   })
    // })
    // return () => {
    //   ;(window as any) = undefined
    // }
  })

  console.log('from app', { session })

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

  const validateAuthentication = useCallback(() => {
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
  }, [router.pathname, session])

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
  const { data: session } = useSession()

  // useEffect(() => {
  //   if (!session) {
  //     return
  //   }

  //   // runOneSignal()
  //   console.log('what', session?.user?.email)

  //   const socket = io('http://localhost:4001', {
  //     auth: {
  //       email: session?.user?.email,
  //     },
  //   })
  //   socket.on('connect', () => {
  //     console.log('socket got pinged')

  //     Notification.requestPermission()
  //   })

  //   socket.on('message', (data) => {
  //     console.log('recieved data', data)
  //   })
  // }, [session])

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
