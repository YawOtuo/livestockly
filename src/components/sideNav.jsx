import { styled } from "@stitches/react"
import { Link } from "react-router-dom"
import NavAccordion from "./navAccordion"
import { IoIosContact } from 'react-icons/io';

const SideNav = () => {
    return (
        <Root>
            <div className="flex items-center gap-2 text-white">
                <IoIosContact color="white" size={40} />
                <p>Yaw Twumasi Otuo</p>
            </div>
            <div className="h-full flex flex-col gap-10">
                <NavButtons><Link to={'/dashboard'}>Home</Link></NavButtons>
                <NavButtons>
                    <NavAccordion
                        items={['sheep', 'goat', 'cattle']}
                        label='Records'
                    />
                </NavButtons>
                <NavButtons><Link to={'/workers'}>Workers</Link></NavButtons>
                {/* <NavButtons><Link>Finances</Link></NavButtons> */}
                {/* <NavButtons><Link>Notifications</Link></NavButtons> */}

                <NavButtons><Link>Settings</Link></NavButtons>
            </div>
            <div>
                <p className="text-white">yotuo2002@gmail.com
                </p>
            </div>
        </Root>
    )
}

const Root = styled('div', {
    paddingBottom: "5px",
    backgroundColor: "#446353fa",
    paddingTop: '40px',
    height: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "5%",
    justifyContent: "between",
    alignItems: "center",
})

export const NavButtons = styled('div', {
    color: "white",

})

export default SideNav