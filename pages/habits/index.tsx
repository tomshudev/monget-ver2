import { gql, useMutation, useQuery } from '@apollo/client'
import { useSession } from 'next-auth/react'
import Expense from '../../components/Expense'
import { MongetSession } from '../api/auth/[...nextauth]'
import { useEffect, useState } from 'react'
import { regSw, subscribe } from '../../lib/helper'

const HabitsByUser = gql`
  query ($first: Int, $after: String, $userId: String!) {
    habits(first: $first, after: $after, userId: $userId) {
      pageInfo {
        endCursor
        hasNextPage
      }
      edges {
        node {
          id
          definition
          name
          description
          startDate
        }
      }
    }
  }
`

const CreateSubscription = gql`
  mutation ($endpoint: String!, $expirationTime: Int, $keys: JSON) {
    createSubscription(
      endpoint: $endpoint
      expirationTime: $expirationTime
      keys: $keys
    ) {
      endpoint
    }
  }
`

const Habits = () => {
  const { data: session } = useSession()
  const { data, error, loading, fetchMore } = useQuery(HabitsByUser, {
    variables: {
      first: 10,
      userId: (session as MongetSession)?.user.uid,
    },
    pollInterval: 60000,
  })

  // useEffect(() => {
  //   // @ts-ignore
  //   window.OneSignal = window.OneSignal || []
  //   // @ts-ignore
  //   OneSignal.push(function () {
  //     // @ts-ignore
  //     OneSignal.init({
  //       appId: '9bfa20e5-ef82-4414-ab19-329d49ef4928',
  //       safari_web_id:
  //         'web.onesignal.auto.40767e72-dc1c-4bfb-b1c2-39a715222d63',
  //       notifyButton: {
  //         enable: true,
  //       },

  //       allowLocalhostAsSecureOrigin: true,
  //     })
  //   })

  //   return () => {
  //     // @ts-ignore
  //     window.OneSignal = undefined
  //   }
  // }, [])

  const [mutate, { loading: subLoading, reset, data: subData }] =
    useMutation(CreateSubscription)
  const [first, setFirst] = useState('no')
  const [test, setTest] = useState('')

  async function registerAndSubscribe() {
    try {
      const serviceWorkerReg = await regSw()
      await subscribe(serviceWorkerReg, (subscription: PushSubscription) => {
        mutate({
          variables: {
            ...JSON.parse(JSON.stringify(subscription)),
          },
        }).then((result) => {
          if (!result.errors) {
            console.log('Success!')
          } else {
            console.error('erorrororsss', result.errors)
          }
        })
      })
    } catch (error: any) {
      console.log(error)
      setFirst(error.toString())
    }
  }

  useEffect(() => {
    registerAndSubscribe()
  }, [])

  if (loading) {
    return <div>Loading...</div>
  } else if (error) {
    return <div>ERROR!!</div>
  } else if (data && data.habits.edges.length === 0) {
    return <div>No expenses yet</div>
  }

  console.log(data, data && data.habits.edges.length === 0)
  const { endCursor, hasNextPage } = data.habits.pageInfo

  // PROGRESSIVE WEB APP!!! PWA!!!!

  return (
    <div className="flex flex-wrap gap-3 justify-center p-2 text-gray-800">
      {
        data.habits.edges.map(({ node }) => (
          <div key={node.id}>
            Hello
            {node.description}
            {node.startDate}
          </div>
        ))
        // <Expense expense={node} key={node.id} />
      }
    </div>
  )
}

export default Habits
