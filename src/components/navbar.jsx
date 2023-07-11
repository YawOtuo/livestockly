import { Link, useNavigate } from 'react-router-dom'
import faceIcon from '../icons/face.png'
import { Button, useMediaQuery } from '@mui/material';
import { useEffect, useState } from 'react';

export const Navbar = () => {
    var currentDate = new Date();
    const isMobile = useMediaQuery('(max-width: 600px)');
    const isTab = useMediaQuery('(max-width: 1000px)');
    const navigate = useNavigate()
    // Get the current date as a string
    var today = currentDate.toLocaleDateString();
    return (
        <div className="shadow-sm grid grid-cols-3 justify-center py-3 px-3 mb-6">
            {!isTab && <div className='col-span-1 text-xs'>
                {today}
            </div>}
            <div className='col-span-full lg:col-span-1 text-center ' >
                <Link to='/dashboard' className='brand-green-font 
                font-bold text-lg'>BOATEY FARMS</Link>
            </div>
            {!isTab &&  <div className='col-span-1 text-right'>
                <div className='flex flex-row justify-center items-center w-full'>

                    <p className='w-full flex flex-row items-center justify-end text-xs '>
                        <img src={faceIcon} width={"30px"} />

                        yotuo2002@gmail.com
                    </p>

                    <Button onClick={e => {
                        navigate('/login')
                    }}>Logout</Button>

                </div>
            </div>}
        </div>
    )
}

export const MobileNav = () => {
    const [openNav, setOpenNav] = useState(false)
    const [width, setWidth] = useState("0%")

    useEffect(()=>{
        if(openNav){
            setWidth("w-[85%]")
        }
    }, [openNav])
    return(
        <div>
            <button onClick={e => setOpenNav((init) => !init)}>
                Open
            </button>
            {
                openNav && 
                <div className={`h-screen bg-[#446353fa] flex flex-col
                text-white items-center gap-10 justify-start pt-20 text-1xl uppercase ease-in-out absolute ${width} z-[10]`}>
                    <p>otuo yaw twumasi</p>
                    <p>Dashboard</p>
                    <p>Finances</p>
                    <p>Logout</p>

                </div>
            }
        </div>
    )
}