import { Button, useMediaQuery } from '@mui/material';
import { useEffect, useState } from 'react';
import { RxHamburgerMenu } from 'react-icons/rx'
import { useDispatch } from 'react-redux';
import Link from 'next/link';
// import { Logout } from './logout';


const faceIcon = '/icons/face.png'

export const Navbar = () => {
    var currentDate = new Date();
    const dispatch = useDispatch()
    const isMobile = useMediaQuery('(max-width: 600px)');
    const isTab = useMediaQuery('(max-width: 1000px)');
    // Get the current date as a string
    var today = currentDate.toLocaleDateString();
    return (
        <div className="shadow-sm grid grid-cols-3 justify-center py-3 px-3 bg-white">
            {!isTab && <div className='col-span-1 text-xs'>
                {today}
            </div>}
            <div className='col-span-full lg:col-span-1 text-center ' >
                <Link href='/dashboard' className='brand-green-font 
                font-bold text-lg'>BOATEY FARMS</Link>
            </div>
            {!isTab && <div className='col-span-1 text-right'>
                <div className='flex flex-row justify-center items-center w-full'>

                    <p className='w-full flex flex-row items-center justify-end text-xs '>
                        <img src={faceIcon} width={"30px"} />

                    </p>

                {/* <Logout nav={true}/> */}

                </div>
            </div>}
        </div>
    )
}

export const MobileNav = () => {
    const [openNav, setOpenNav] = useState(false)
    const [width, setWidth] = useState("0%")

    useEffect(() => {
        if (openNav) {
            setWidth("w-[85%]")
        }
    }, [openNav])
    return (
        <div>
            <div className='p-5 pb-0'>

                <button onClick={e => setOpenNav((init) => !init)}>
                    <RxHamburgerMenu size={30} color='#446353fa' />
                </button>

                <h3 className='text-[#446353fa] font-bold'>BOATEY FARMS</h3>

            </div>
            {
                openNav &&
                <div className='h-[500px] mb-10'>
                    {/* <SideNav /> */}

                </div>
            }
        </div>
    )
}