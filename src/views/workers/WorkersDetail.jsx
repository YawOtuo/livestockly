import { useQuery } from "react-query"
import { fetchCompanyUsersOne } from "./api"
import { useDispatch, useSelector } from "react-redux"
import Layout from "../layout"
import SlideEnter from "../../framer/slideEnter"
import { useParams } from "react-router-dom"
import { AiOutlineMail } from "react-icons/ai"
import { getStatus } from "../../utils/permissions"
import { BsFillPersonLinesFill } from 'react-icons/bs'
import { AcceptUser, DeAcceptUser, fetchUser } from "../../api/users"
import { addMessage } from "../../redux/reducers/messages"
import { Button } from "@mui/material"

export const WorkersDetail = () => {
    const params = useParams()
    const dispatch = useDispatch()
    const userData = useSelector((state) => state?.users?.user)
    const { data, error, isLoading } = useQuery('farm-users', () => fetchUser(params.id), {
    })
    return (
        <Layout>
            <SlideEnter>
                <div className="flex flex-col w-full items-center justify-center">
                    <div className="flex flex-col justify-center w-full items-center h-full pt-20 ">
                        {isLoading && <p>Loading</p>}

                        <p className="text-2xl font-bold">  {data && data[0].username}
                        </p>

                        <div className="grid grid-cols-3 gap-x-5 gap-y-5 w-full items-center justify-center capitalize">

                            <div></div>
                            <div className="flex flex-col gap-5 text-md col-span-1 items-start justify-center">
                                <p>
                                    {data && data[0].username}

                                </p>
                                <p>  {data && data[0].email}</p>
                                <p className="uppercase ">   {getStatus(data && data[0].permission)}</p>



                            </div>

                        </div>

                    </div>
                    <div className="flex mt-10 gap-5">

                        {data && data[0].acceptedIntoFarm == false || data[0].acceptedIntoFarm == null && <Button onClick={() => {

                            AcceptUser(params.id)
                                .then(() => (
                                    dispatch(addMessage("User has been aceepted into farm"))
                                ))
                        }
                        } className="bg-green1 px-10 py-3 text-white ">
                            Accept User
                        </Button>}

                        {data && data[0].acceptedIntoFarm && <Button onClick={() => {

                            DeAcceptUser(params.id)
                                .then(() => (
                                    dispatch(addMessage("User has been remove into farm"))
                                ))
                        }
                        } className="bg-red-500 px-10 py-3 text-white ">
                            Remove User
                        </Button>}
                    </div>

                </div>

            </SlideEnter>
        </Layout>
    )
}   