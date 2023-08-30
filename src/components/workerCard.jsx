import { styled } from "@stitches/react"
import { IoIosContact } from "react-icons/io"

const WorkerCard = () => {
    return(
        <Root>
            <IoIosContact size={150} color="grey"/>
            <p>Name nde</p>
        </Root>
    )
}

const Root = styled('div', {
    backgroundColor:"#6fa88a17",
    minWidth:"300px",
    width:"100%",
    maxWidth:"500px",
    display:"flex",
    flexDirection:"column",
    justifyContent:"center",
    alignItems:"center",
    minHeight:"200px",
    maxHeight:"300px",
    height:"100%",
    aspectRatio:"500/400",

    " &:hover":{
        backgroundColor:"rgb(12, 0, 0 , 12%)",

    }

})

export default WorkerCard