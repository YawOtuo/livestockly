import Link from 'next/link'
// import AddRecordModal from './add-record-modal'
import { useState } from 'react'
import React from 'react'
import AddRecordModal from './AddRecordModal'

const rightArrow = '/icons/arrow-right.png'


export const RecordCard = (props) => {

    return (
        <div className='record-card relative'>
            <div className="shadow-md text-center py-5 px-5 mt-5 flex flex-row justify-between">
                <Link href={`/dashboard/records/${props.type}`}>

                <div className="flex flex-row text-center items-center ">
                    <div className=""><img src={props.icon} width="50%" /></div>
                    <div className="text-uppercase w-full"> {props.type} ({props.number})</div>
                </div>
                </Link>


                <div className='flex flex-row text-center items-center '>
                    <div>
                        <AddRecordModal type={props.type}/>


                    </div>

                    <div>
                        <Link href={`/dashboard/records/${props.type}`}>

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