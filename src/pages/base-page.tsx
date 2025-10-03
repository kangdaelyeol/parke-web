import { Outlet } from 'react-router-dom'

export default function BasePage() {
    return (
        <div className="flex flex-col justify-center items-center bg-[#222] w-full h-[100vh]">
            <Outlet />
        </div>
    )
}
