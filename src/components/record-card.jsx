import { Link } from 'react-router-dom'
import rightArrow from '../icons/arrow-right.png'
import AlertDialogSlide from './add-record-modal'
import { useState } from 'react'

export const RecordCard = (props) => {

    return (
        <div className='record-card relative'>
            <div className="shadow-md text-center py-5 px-5 mt-5 flex flex-row justify-between">
                <Link to={`/dashboard/${props.type}`}>

                <div className="flex flex-row text-center items-center ">
                    <div className=""><img src={props.icon} width="50%" /></div>
                    <div className="text-uppercase w-full"> {props.type} ({props.number})</div>
                </div>
                </Link>


                <div className='flex flex-row text-center items-center '>
                    <div>
                        <AlertDialogSlide type={props.type}/>


                    </div>

                    <div>
                        <Link to={`/dashboard/${props.type}`}>

                        <div className=""><img src={rightArrow} width="50%" /></div>
                        </Link>
                    </div>
                    {/* <div className='absolute right-0 h-full' >
                        <img src='/greenFrame.svg' width={"100"} height={"100%"}></img>
                    </div> */}
                </div>
            </div >
        </div>

    )
}   