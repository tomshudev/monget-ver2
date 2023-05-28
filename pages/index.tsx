import { useQuery } from '@apollo/client'
import { Habit, User } from '@prisma/client'
import { gql } from 'apollo-server-micro'
import type { NextPage } from 'next'
import { getProviders, getSession, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import Dashboard from '../components/Dashboard/Dashboard'
import LeftSidebar from '../components/LeftSidebar/LeftSidebar'
import Login from '../components/Login'
import RightSidebar from '../components/RightSidebar/RightSidebar'
import { MongetSession } from './api/auth/[...nextauth]'
import * as OneSignal from '@onesignal/node-onesignal'

const AllUsersQuery = gql`
  query {
    users {
      id
      name
      email
      image
      role
    }
  }
`

const Home = () => {
  // const {data: session} = useSession()
  // const { data, error, loading, fetchMore } = useQuery(ExpensesByUser, {
  //   variables: {
  //     first: 1,
  //     userId: (session as MongetSession)?.user.uid,
  //   },
  //   pollInterval: 10000
  // })

  // if (loading) {
  //   return <div>Loading...</div>
  // } else if (error) {
  //   return <div>ERROR!!</div>
  // } else if (data && data.expenses.edges.length === 0) {
  //   return <div>No expenses yet</div>
  // }

  // console.log(data, data && data.expenses.edges.length === 0)
  // const { endCursor, hasNextPage } = data.expenses.pageInfo

  const router = useRouter()

  useEffect(() => {
    router.push('/habits')
  }, [])

  return <></>

  // return (
  // <>
  //   {data?.expenses.edges.map(({ node }: { node: Expense }) => (
  //     <div key={node.id}>
  //       Hello, {node.id}, {node.expense}, {new Date(node.date).toUTCString()}
  //     </div>
  //   ))}
  //   {hasNextPage && (
  //     <button
  //       onClick={() => {
  //         fetchMore({
  //           variables: { after: endCursor },
  //           updateQuery: (prevResult: any, { fetchMoreResult }) => {
  //             fetchMoreResult.expenses.edges = [
  //               ...prevResult.expenses.edges,
  //               ...fetchMoreResult.expenses.edges,
  //             ]

  //             return fetchMoreResult
  //           },
  //         })
  //       }}
  //     >
  //       Fetch more!
  //     </button>
  //   )}
  // </>
  // <div className='flex justify-between h-full'>
  //   <LeftSidebar />
  //   <Dashboard />
  //   <RightSidebar />
  // </div>
  //   <></>
  // )
}

export const getServerSideProps = async (context) => {
  const session = await getSession(context)
  if (!session) {
    context.res.writeHead(302, { Location: '/login' })
    context.res.end()
    return {}
  }

  return {
    props: {
      session,
    },
  }
}

export default Home
