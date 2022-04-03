import { signOut, useSession } from 'next-auth/react'
import GoogleLoginComp from './Login'

const Header = () => {
  const { data: session } = useSession()

  return (
    <div className="p-4 w-full bg-[#424242]">
      <div className="mx-auto flex items-center justify-between max-w-[1500px] text-white font-josefin text-xl">
        <div className="font-bold text-2xl leading-5">Monget</div>
        <div className="text-md font-normal">
          <span className="font-thin">Hello, </span>
          <span className="font-semibold">{session?.user?.name}</span>
          <span
            className="pl-2 hover:underline font-extralight text-lg cursor-pointer text-[#d9d9d9]"
            onClick={() => signOut()}
          >
            (logout)
          </span>
        </div>
      </div>
    </div>
  )
}

export default Header
