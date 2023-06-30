import { ApolloClient, InMemoryCache } from '@apollo/client'

const apolloClient = new ApolloClient({
  // uri: 'http://localhost:4000/api/graphql',
  uri: 'https://habits-server-pimf.onrender.com/api/graphql',
  cache: new InMemoryCache(),
})

export default apolloClient
