import { Link, useNavigate } from 'react-router-dom'
import faceIcon from '../icons/face.png'
import { Button, useMediaQuery } from '@mui/material';

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