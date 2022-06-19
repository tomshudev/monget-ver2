import { PlusCircleIcon } from '@heroicons/react/outline'
import Link from 'next/link'

const Dashboard = () => {
  return (
    <div className="flex flex-col w-full h-full p-4 pr-8 text-gray-800 font-josefin">
      <div className="flex justify-between items-center h-16 pt-6">
        <div className="font-bold text-[40px]">Your Dashboard</div>
        <div>
          Showing for <span className="font-bold">1 Apr - 5 Apr 2022</span>
        </div>
      </div>
      <div className="flex w-fit-content h-[6rem] bg-white bg-opacity-50 rounded-[1rem] p-2 mt-4">
        <Link href={'/expenses/new'}>
          <div className="flex flex-col items-center justify-center px-4 py-2 hover:bg-[#424242] hover:bg-opacity-20 rounded-[1rem] cursor-pointer transition-all duration-200 ease-in-out">
            <PlusCircleIcon width={25} height={25} />
            Add New Expense
          </div>
        </Link>
      </div>
    </div>
  )
}

export default Dashboard
