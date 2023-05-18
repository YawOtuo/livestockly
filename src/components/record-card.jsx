import { Link } from 'react-router-dom'
import rightArrow from '../icons/arrow-right.png'
import AlertDialogSlide from './add-record-modal'

export const RecordCard = (props) => {
    return (
        <div className='record-card'>
            <div className="shadow-md text-center py-5 px-5 mt-5 flex flex-row justify-between">
                <Link to='/dashboard/goats'>

                <div className="flex flex-row text-center items-center ">
                    <div className=""><img src={props.icon} width="50%" /></div>
                    <div className=""> {props.type}</div>
                </div>
                </Link>


                <div className='flex flex-row text-center items-center '>
                    <div>
                        <AlertDialogSlide />


                    </div>

                    <div>
                        <Link to='/dashboard/goats'>

                        <div className=""><img src={rightArrow} width="50%" /></div>
                        </Link>
                    </div>
                </div>
            </div >
        </div>

    )
}   