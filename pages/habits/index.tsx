import { gql, useQuery } from '@apollo/client'
import { useSession } from 'next-auth/react'
import Expense from '../../components/Expense'
import { MongetSession } from '../api/auth/[...nextauth]'
import { useEffect } from 'react'

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
          <div>
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
