import { styled } from "@stitches/react"
import Layout from "../layout"
import WorkerCard from "../../components/workerCard"
import SlideEnter from "../../framer/slideEnter"
import { useQuery } from "react-query"
import { fetchCompanyUsers } from "./api"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { FcInvite } from 'react-icons/fc'
import { Button } from "@mui/material"
import { Link } from "react-router-dom"
import { GetAllFarmUsers, GetAllFarmUsersAccepted, GetAllFarmUsersUnaceppted } from "../../api/farm"

const Workers = () => {
    const userData = useSelector((state) => state?.users?.user)
    const { data: acceptedUsers, error: er2, isLoading1: is2 } = useQuery(
        'farm-users-accepted',
        () => GetAllFarmUsersAccepted(userData?.farm_id),
        {
            enabled: userData?.farm_id !== undefined, // Enable the query only if farm_id is defined
        }
    );

    const { data: unacceptedUsers, error: er3, isLoading: is3 } = useQuery(
        'farm-users-unaccepted',
        () => GetAllFarmUsersUnaceppted(userData?.farm_id),
        {
            enabled: userData?.farm_id !== undefined, // Enable the query only if farm_id is defined
        }
    );



    return (
        <Layout>
            <SlideEnter>
                <Root className="flex flex-col gap-10">
                    <div className="flex justify-start pt-2">
                        WORKERS
                    </div>
                    <div className="flex justify-center items-center p-5 gap-20">
                        <p className="font-semibold">
                            No new requests
                        </p>

                    </div>
                    <div className="flex flex-col flex-wrap gap-5 items-start">
                        <p className="font-semibold">Unaccepted users</p>
                        {is3 &&
                            <p>Loading...</p>}
                        <div className="flex gap-5 flex-wrap">
                            {
                                unacceptedUsers && unacceptedUsers[0] &&
                                unacceptedUsers?.map((r) => (
                                    <Link to={`/workers/${r.id}`}> <WorkerCard key={r.id} data={r} /></Link>
                                ))
                            }
                        </div>
                    </div>
                    <div className="flex flex-col flex-wrap gap-5 items-start">
                        <p className="font-semibold">Accepted users</p>
                        {is2 &&
                            <p>Loading...</p>}
                        <div className="flex gap-5 flex-wrap">
                            {
                                acceptedUsers && acceptedUsers[0] &&
                                acceptedUsers?.map((r) => (
                                    <Link to={`/workers/${r.id}`}> <WorkerCard key={r.id} data={r} /></Link>
                                ))
                            }
                        </div>
                    </div>
                </Root>
            </SlideEnter>
        </Layout>
    )
}

const Root = styled('button', {
    paddingInline: "2rem",

}

)
export default Workers