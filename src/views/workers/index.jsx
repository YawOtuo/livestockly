import { styled } from "@stitches/react"
import Layout from "../layout"
import WorkerCard from "../../components/workerCard"
import SlideEnter from "../../framer/slideEnter"
import { useQuery } from "react-query"
import { fetchCompanyUsers } from "./api"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import {FcInvite} from 'react-icons/fc'
import { Button } from "@mui/material"
import { Link } from "react-router-dom"

const Workers = () => {
    const userData = useSelector((state) => state?.users?.user)
    const { data, error, isLoading } = useQuery('company-users', () => fetchCompanyUsers(userData?.company_id))

    return (
        <Layout>
            <SlideEnter>
                <Root>
                    <div className="flex justify-start pt-2">
                        WORKERS
                    </div>
                    <div className="flex justify-center items-center p-5 gap-20">
                        <p>
                            No new requests
                        </p>
                        <Button sx={{
                            color:"#0fa958"
                        }} className="flex items-center justify-center gap-3">Invite
                            <FcInvite size={30}/>
                        </Button>
                    </div>
                    <div className="flex flex-wrap gap-5 justify-evenly">
                        {isLoading ? (
                            <p>Loading...</p>
                        ) : error ? (
                            <p>Error: {error.message}</p>
                        ) : data && Array.isArray(data) ? (
                            data.map((r) => (
                               <Link to={`/workers/${r.id}`}> <WorkerCard key={r.id} data={r} /></Link>
                            ))
                        ) : null}
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