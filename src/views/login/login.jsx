import {  TextField } from "@mui/material"
import { useNavigate } from "react-router-dom"
import Button from "../../ui/Button"
import { styled } from "@stitches/react"

export const Login = () => {
    const navigate = useNavigate()
    return (
        <Root className="py-5 px-4  bg-grey bg-darkened view_height_100">
            <div className="flex flex-col lg:flex-row m-1 md:m-5  h-full ">
                <div className="flex-[0_1_50%]  bg-login-left flex flex-col justify-center items-center">

                </div>
                <div className="flex-[1_1_700px]
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
        </Root>
    )

    
}

const Root = styled('div', {

})