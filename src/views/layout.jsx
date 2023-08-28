import { styled } from "@stitches/react"
import SideNav from "../components/sideNav"
import { useMediaQuery } from "@mui/material"

const Layout = ({children}) => {
    const matches = useMediaQuery('maxWidth:"920px"')
    return (
        <Root className="md:grid grid-cols-5 pt-2 
        bg-[#446353fa]">
            
        
            <div className="hidden md:block md:col-span-1">
                <SideNav />

            </div>
            <div className="col-span-4 bg-white ch">
                {children}
            </div>
        </Root>

    )
}

const Root = styled('div', {
    height:"100vh",
    "& .ch":{
        borderTopLeftRadius:"22px",
    },
    "@media screen and (max-width:420px)":{
        height:"auto"
    }
})


export default Layout