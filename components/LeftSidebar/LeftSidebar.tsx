import Link from 'next/link'
import { routes } from './routes'

const LeftSidebar = () => {
  return (
    <div className="p-4 h-full">
      <div className="p-4 text-[#424242] bg-white bg-opacity-50 h-full w-[4rem] lg:w-[15rem] rounded-[40px] flex flex-col items-center">
        <div className="font-bold text-2xl pt-2">Monget.</div>

        <div className="flex flex-col pt-10 text-xl gap-y-6 items-center">
          {routes.map((route) => (
            <Link key={route.text.toLowerCase()} href={route.path}>
              <div className="flex gap-2 cursor-pointer">
                {route.icon}
                {route.text}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default LeftSidebar
