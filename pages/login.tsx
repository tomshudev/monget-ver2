import { getProviders } from 'next-auth/react'
import Login from '../components/Login'

const LoginPage = ({ providers }) => {
  return (
    <>{providers ? <Login provider={Object.values(providers)[0]} /> : <div>Loading...</div>}</>
  )
}

export const getServerSideProps = async () => {
  const providers = await getProviders()
  
  return {
    props: {
      providers,
    },
  }
}

export default LoginPage
