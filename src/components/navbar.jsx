import { Link } from 'react-router-dom'
import faceIcon from '../icons/face.png'

export const Navbar = () => {
    return (
        <div className="shadow-sm flex flex-row justify-between 
          text-center justify-center py-3 px-3 mb-6">
            <div className='text-xs'>
                January
            </div>
            <div>
                <Link to='/dashboard' className='brand-green-font text-lg'>BOATEY FARMS</Link>
            </div>
            <div className='flex flex-row justify-center'>
                <div className="text-xs"><img src={faceIcon} width="50%" /></div>

               <div className='text-xs'> yotuo2002@gmail.com</div>
            </div>
        </div>
    )
}