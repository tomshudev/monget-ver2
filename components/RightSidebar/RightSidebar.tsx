import UserBar from './UserBar'

const RightSidebar = () => {
  return (
    <div className="bg-white bg-opacity-50 hidden sm:flex w-[4rem] lg:w-[25rem] h-full p-4 pt-8 ml-4">
      <UserBar />
    </div>
  )
}

export default RightSidebar
