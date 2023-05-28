import { useSession } from 'next-auth/react'
import { BellIcon } from '@heroicons/react/outline'
import Image from 'next/image'
import { regSw, subscribe } from '../../lib/helper'
import { gql, useMutation } from '@apollo/client'

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

const UserBar = () => {
  const { data: session } = useSession()

  const [mutate, { loading, reset, data }] = useMutation(CreateSubscription)

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
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="flex justify-between h-fit w-full">
      <div className="hidden lg:flex border border-transparent hover:border-gray-400 rounded-full w-10 h-10 items-center justify-center cursor-pointer hover:bg-gray-300 hover:transition hover:duration-[350ms]">
        <BellIcon
          width={30}
          height={30}
          color="rgb(156, 163, 175)"
          // onClick={() => {
          //   const notification = new Notification('Hello world!')
          //   notification.addEventListener('error', (e) => {
          //     console.log(e)
          //   })

          //   notification.addEventListener('show', (e) => {
          //     console.log('showing', e)
          //   })
          // }}
          onClick={registerAndSubscribe}
        />
      </div>

      <div className="w-10 h-10 border border-transparent cursor-pointer hover:border-gray-400 flex items-center justify-center rounded-full hover:transition hover:duration-[350ms]">
        <Image
          src={
            session?.user?.image || 'https://lh3.googleusercontent.com/a.png'
          }
          width={32}
          height={32}
          className="h-8 w-8 rounded-full"
        />
      </div>
    </div>
  )
}

export default UserBar
