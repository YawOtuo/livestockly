import { Link } from 'react-router-dom'
import faceIcon from '../icons/face.png'
import { Button } from '@mui/material';

export const Navbar = () => {
    var currentDate = new Date();
    

    // Get the current date as a string
    var today = currentDate.toLocaleDateString();
    return (
        <div className="shadow-sm grid grid-cols-3 justify-center py-3 px-3 mb-6">
            <div className='col-span-1 text-xs'>
                {today}
            </div>
            <div className='col-span-1 text-center ' >
                <Link to='/dashboard' className='brand-green-font 
                font-bold text-lg'>BOATEY FARMS</Link>
            </div>
            <div className='col-span-1 text-right'>
                <div className='flex flex-row justify-center items-center w-full'>

                    <p className='w-full flex flex-row items-center justify-end text-xs '>
                        <img src={faceIcon} width={"30px"} />

                        yotuo2002@gmail.com
                    </p>

                    <Button >Logout</Button>

                </div>
            </div>
        </div>
    )
}