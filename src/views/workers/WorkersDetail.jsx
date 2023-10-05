import { useQuery } from "react-query"
import { fetchCompanyUsersOne } from "./api"
import { useSelector } from "react-redux"
import Layout from "../layout"
import SlideEnter from "../../framer/slideEnter"
import { useParams } from "react-router-dom"
import { AiOutlineMail } from "react-icons/ai"
import { getStatus } from "../../utils/permissions"
import { BsFillPersonLinesFill } from 'react-icons/bs'

export const WorkersDetail = () => {
    const params = useParams()
    const userData = useSelector((state) => state?.users?.user)
    const { data, error, isLoading } = useQuery('company-users', () => fetchCompanyUsersOne(userData?.company_id, params.id))
    return (
        <Layout>
            <SlideEnter>
                <div className="flex flex-col items-start justify-center ">
                    {isLoading && <p>Loading</p>}
                    <div className="text-4xl font-bold py-10 bg-[#8390891f] w-full px-10">
                        {data && data['username']}

                    </div>
                    <div className="px-10 gap-5 flex flex-col py-10">
                        <div>
                            {data && <div className="flex gap-2 items-center justify-center">
                                <AiOutlineMail size={25} />

                                {data['email']
                                }                                </div>}

                        </div>
                        <div>
                            {data &&
                                <div className="flex gap-2 items-center justify-center">
                                    <BsFillPersonLinesFill size={25} />
                                    {getStatus(data['permission'])}

                                </div>}

                        </div>
                        <div>
                            Change Permission
                        </div>
                    </div>

                </div>

            </SlideEnter>
        </Layout>
    )
}   