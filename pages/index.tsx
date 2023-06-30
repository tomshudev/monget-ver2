import { gql } from 'apollo-server-micro'
import { getSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

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

  console.log('from index', { session })

  if (!session) {
    console.log('forwarding to login')
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
