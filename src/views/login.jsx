import {  TextField } from "@mui/material"
import { useNavigate } from "react-router-dom"
import Button from "../ui/Button"

export const Login = () => {
    const navigate = useNavigate()
    return (
        <div className="py-5 px-4  bg-grey bg-darkened view_height_100">
            <div className="grid grid-cols-2 m-1 md:m-5  h-full ">
                <div className="col-span-2 md:col-span-1  bg-login-left flex flex-col justify-center items-center">

                </div>
                <div className="col-span-2 md:col-span-1  px-5 
                py-5 md:py-0 flex flex-col justify-center items-center
                 bg-white" style={{height: 'max-height'}}>
                    <h1 className="uppercase brand-green-font font-bold">Boatey Farms</h1>

                    <div className="py-5">
                        <TextField label='COMPANY CODE' />

                    </div>
                    <div className="py-5">
                        <TextField label='USERNAME' />

                    </div>

                    <div className="py-5">
                        <TextField label='EMAIL' />


                    </div>
                    <div className="flex flex-col gap-4">
                        <Button 
                        size={'small'}
                        onClick={e => navigate('/dashboard')}
                        className="">SIGN UP</Button>

                         <Button 
                         variant={'white'}
                         size={'small'}
                        onClick={e => navigate('/dashboard')}
                        className="text-center">LOGIN</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}