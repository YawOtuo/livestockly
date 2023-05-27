import { useParams } from "react-router-dom"
import { Navbar } from "../components/navbar"

export const DetailView = (props) => {

    const params = useParams()

    const info = ['Name/Tag', 'Tag Colour',
        'Sire: ', 'Dam',
        'Number of Kids', 'Gender',
    "Colour", "Castrated", "Health Condition", "Remarks"]

    const displayInfo = () => {
        return info.map((item) => {
            return <div className="col-span-6 md:col-span-2 p-5 ">
                {item} : N/A
            </div>
        })
    }

    return (
        <div className="justify-center text-center">
            <Navbar/>
            <div className=" justify-center">
                <h1> {params.id}</h1>

                <div className="p-10 flex flex-col">
                    <div className="grid grid-cols-6 gap-3 
                    justify-center items-center">
                        {displayInfo()}
                    </div>
                </div>
            </div>
        </div>
    )
}