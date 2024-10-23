import { Outlet } from 'react-router-dom'
import Navbar from '../components/header/navbar'


function Home() {

    return (
        <>
            <div className="min-h-screen w-screen font-custom bg-gray-100 flex flex-col items-center gap-5">
                <Navbar />
                <Outlet/>
            </div>
        </>
    )
}

export default Home
