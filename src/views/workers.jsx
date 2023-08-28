import { styled } from "@stitches/react"
import Layout from "./layout"
import WorkerCard from "../components/workerCard"

const Workers = () => {
    return(
        <Layout>
            <Root>
                <div className="flex justify-start pt-2">
                    WORKERS
                </div>
               <div className="flex flex-wrap gap-5 justify-evenly">
                    {
                        Array.from({length:9})
                        .map((r)=>(
                            <WorkerCard/>
                        ))
                    }
               </div>
            </Root>
        </Layout>
    )
}

const Root = styled('button', {
    paddingInline:"2rem",

}
    
)
export default Workers