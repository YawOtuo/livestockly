import { styled } from "@stitches/react"
import { IoIosContact } from "react-icons/io"

const WorkerCard = (props) => {
    return (
        <Root className="flex items-center justify-center gap-5 px-10 py-5 shadow-md">
            <IoIosContact size={50} color="grey" />
            <p>{props?.data?.username}</p>
        </Root>
    )
}

const Root = styled('div', {
    border: "1px solid #6fa88a17",
    minWidth: "100px",
    width: "100%",
    maxWidth: "200px",
    height: "100%",
    aspectRatio: "200/100",

    " &:hover": {
        backgroundColor: "rgb(12, 0, 0 , 12%)",

    }

})

export default WorkerCard