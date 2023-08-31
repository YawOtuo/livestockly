import {  TextField } from "@mui/material"
import { useNavigate } from "react-router-dom"
import Button from "../../ui/Button"
import { styled } from "@stitches/react"
import { useState } from "react"
import { login, signUp } from "../../api/apis"
import { useDispatch } from "react-redux"
import { addMessage } from "../../redux/reducers/messages"
import { setUserToken } from "../../redux/reducers/users"

export const Login = () => {
    const navigate = useNavigate()
    const [user, setUser] = useState([

    ])
    const dispatch = useDispatch()

    const handleOnChange = (e) => {
        console.log('value here')
        let value = e.target.value
        let name = e.target.name 
        setUser({...user, [name]: value})
    }
    const handleLogin = (e) => {
        login(user)
        .then((res)=>{
            console.log(res)
            localStorage.setItem('authToken', 
            JSON.stringify(res.data))
            dispatch(addMessage(res.message))
            dispatch(setUserToken(res.data))
            dispatch(addMessage('LoginSuccessful'))
            navigate('/dashboard')
           

// Retrieving the token



        })
        .catch((err)=> {
            dispatch(addMessage(err.response.data['detail']))
        })
    }
    
    const handleSignUp = (e) => {
        signUp(user)
        .then((res)=>{
            localStorage.setItem('authToken', 
            JSON.stringify(res.data))
            dispatch(addMessage(res.message))
            dispatch(setUserToken(res.data))
            dispatch(addMessage('SignUp Succesful'))
          
            navigate('/dashboard')


        })
        .catch((err)=> {
            dispatch(addMessage(err.response.data['detail']))
        })
    }
    
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
                        <TextField label='COMPANY CODE' 
                        name="company_code"
                        onChange={handleOnChange}/>

                    </div>
                    <div className="py-5">
                        <TextField label='USERNAME' 
                        name="username"
                        value={user.username}
                        onChange={handleOnChange}/>

                    </div>

                    <div className="py-5">
                        <TextField label='PASSWORD' 
                        name="password"
                        type="password"
                        value={user.password}
                        onChange={handleOnChange}/>


                    </div>
                    <div className="flex flex-col gap-4">
                        <Button 
                        size={'small'}
                        onClick={handleSignUp}
                        className="">SIGN UP</Button>

                         <Button 
                         variant={'white'}
                         size={'small'}
                        onClick={handleLogin}
                        className="text-center">LOGIN</Button>
                    </div>
                </div>
            </div>
        </Root>
    )

    
}

const Root = styled('div', {

})