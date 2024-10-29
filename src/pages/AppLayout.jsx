import { Outlet } from 'react-router-dom'

const AppLayout = () => {
    

    return (
        <main className='bg-main w-full h-[100dvh]'>
            <Outlet />
        </main>
    )
}

export default AppLayout
