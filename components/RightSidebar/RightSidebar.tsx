import UserBar from "./UserBar"

const RightSidebar = () => {
    return (
        <div className="bg-white bg-opacity-50 hidden sm:flex w-[4em] lg:w-[14rem] h-full p-4">
            <UserBar />
        </div>
    )
}

export default RightSidebar