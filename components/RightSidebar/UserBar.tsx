import { useSession } from 'next-auth/react'
import { BellIcon } from '@heroicons/react/outline'
import Image from 'next/image'

const UserBar = () => {
  const { data: session } = useSession()

  return (
    <div className="flex justify-between h-fit w-full">
      <div className="hidden lg:flex border border-transparent hover:border-gray-400 rounded-full w-10 h-10 items-center justify-center cursor-pointer hover:bg-gray-300 hover:transition hover:duration-[350ms]">
        <BellIcon width={30} height={30} color="rgb(156, 163, 175)" />
      </div>

      <div className="w-10 h-10 border border-transparent cursor-pointer hover:border-gray-400 flex items-center justify-center rounded-full hover:transition hover:duration-[350ms]">
        <Image
          src={session?.user?.image || ''}
          width={32}
          height={32}
          className="h-8 w-8 rounded-full"
        />
      </div>
    </div>
  )
}

export default UserBar
