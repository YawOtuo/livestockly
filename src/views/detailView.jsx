import { useParams } from "react-router-dom"
import { Navbar } from "../components/navbar"
import { useEffect, useState } from "react"
import axios from "axios"
import { url } from "../weburl"
import cattleIcon from '../icons/cattle.png'
import goatIcon from '../icons/goat.png'
import sheepIcon from '../icons/sheep.png'
import { Button } from "@mui/material"
export const DetailView = (props) => {

    const params = useParams()
    const [animal, setAnimal] = useState([])

    useEffect(() => {
        axios
            .get(`${url}records/${params.id}`)
            .then((res) => {
                setAnimal(res.data)
                console.log(res)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    const info = ['Name/Tag', 'Tag Colour',
        'Sire: ', 'Dam', "Type",
        'Number of Kids', 'Gender',
        "Colour", "Castrated", "Health Condition", "Remarks"]

    const displayInfo = () => {
        if (animal) {

            return (
                <div className=" items-center justify-center w-4/5 md:w-2/4">
                    <div className=" flex  flex-col md:flex-row justify-center text-left capitalize ">
                        <div className=" w-full">
                            <div> name: {animal['name'] || "N/A"} </div>
                            <div> type: {animal['type'] || "N/A"} </div>
                            <div> tag_colour: {animal['tag_colour'] || "N/A"}</div>
                            <div> number of kids: {animal['number_of_kids'] || "N/A"}</div>

                        </div>
                        <div className="w-full">
                            <div> colour: {animal['colour'] || "N/A"}</div>
                            <div> castrated: {animal['castrated'] || "N/A"}</div>
                            <div> health condition: {animal['health_condition'] || "N/A"}</div>
                            <hr />
                            <div> remarks: <span className="brand-green-font font-bold">{animal['remarks'] || "N/A"}</span></div>

                        </div>


                    </div>

                </div>

            )
        }
    }

    return (
        <div className="justify-center text-center">
            <Navbar />
            <div className=" justify-center">
                <div className="flex flex-row justify-center items-center text-uppercase">
                    {animal && animal.type == "goat" &&
                        <img src={goatIcon} className="w-100" />}
                    {animal && animal.type == "sheep" &&
                        <img src={sheepIcon} className="w-100" />}
                    {animal && animal.type == "cattle" &&
                        <img src={cattleIcon} className="w-100" />}
                    <h1 className="font-xl font-bold uppercase"> {!animal ? params.id : animal.name}</h1> </div>

                <div className="p-10 flex flex-col">
                    <div className="
                    justify-center items-center flex ">
                        {displayInfo()}
                    </div>
                </div>

                <div className="justify-center ">
                    <Button sx={{color : "#0FA958"}}
                    >Edit</Button>
                    <Button sx={{color: "red"}}>Delete</Button>

                </div>
            </div>
        </div>
    )
}