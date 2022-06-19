import { signIn } from 'next-auth/react'
import { FC } from 'react'
import GoogleIcon from './GoogleIcon'

const Login: FC<any> = ({ provider }) => {
  return (
    <div className="w-full flex flex-col items-center font-josefin min-h-full justify-center text-[#424242]">
      <div className="font-bold text-[72px]">Monget</div>
      <div className='text-[30px] font-thin leading-8 tracking-tighter text-center w-[80%]'>
        Welcome to your expenses manager, using our tool you could track your expenses,
        analyze your spending habits and even manage the entire family together.
      </div>
      <div className='pt-8'>
        <button
          onClick={() => signIn(provider.id, {callbackUrl: '/'})}
          className="p-2 gap-2 bg-white font-['Roboto'] text-lg w-fit cursor-pointer hover:opacity-[0.95] active:bg-[#eee] hover:text-[rgba(0,0,0,0.85)] rounded-md flex items-center text-[#424242]"
        >
          <GoogleIcon />
          <span>Sign in with Google</span>
        </button>
      </div>
    </div>
  )
}

export default Login
