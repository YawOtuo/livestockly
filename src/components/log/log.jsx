import { styled } from "@stitches/react"
import { useEffect, useState } from "react"
import { MdOutlineDelete } from 'react-icons/md'
import { BiSolidBookAdd } from 'react-icons/bi'
import LogModal from "./logModal"
import { useQuery } from "react-query"
import { fetchRecord } from "../../views/detailView/api"
import { useParams } from "react-router-dom"
import { AiOutlineEdit } from "react-icons/ai"

const Log = (props) => {
    const params = useParams();
    const { data, error, isLoading } = useQuery('record', () => fetchRecord(params.id));

    const [r, setR] = useState()
    useEffect(() => {
        if (props.label == 'weight') {
            setR(data?.weight)
        }
        if (props.label == 'vaccination_info') {
            setR(data?.vaccination_info)
        }
        if (props.label == 'health_condition') {
            setR(data?.health_condition)
        }
        if (props.label == 'remarks') {
            setR(data?.remarks)
        }
    }, [data])

    return (
        <Root >

            <div className="flex gap-3 items-center uppercase text-[#0FA958]
           font-bold ">
                {props.title}
                <LogModal icon='add' type={props.title} label={props.label} />


            </div>
            {
                r?.map((r) => (
                    <LogI className="shadow-md flex justify-between">

                        <div>
                            <p className="text-[#0FA958] text-xs 
                            text-wrap font-bold">{r['date']}</p>

                            <p className=" text-left text-sm " style={{
                                lineHeight: "1.8"
                            }}>{r['content']}</p>
                        </div>

                        <div className="flex gap-1 lg:gap-4">
                            <LogModal 
                            edit={true}
                            icon="edit"
                            type={props.title} label={props.label} 
                            data={data}/>
                            <button >
                                <MdOutlineDelete size={20} /></button>
                        </div>
                    </LogI>
                ))
            }
        </Root>
    )
}

const Root = styled('div', {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "5px",
})

const LogI = styled('div', {
    paddingBlock: "1rem",
    paddingInline: "1rem",
    display: "flex",
    flexDirection: "row",
    gap: "5px",
    alignItems: "center",
    backgroundColor: "",
    width: "100%",
    minHeight: "50px",
    "@media screen and (max-width:500px)": {
        paddingInline: "0.5rem",
        alignItems: "start",
        gap: "10px",

    }
})


export default Log