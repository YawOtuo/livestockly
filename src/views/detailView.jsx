import { useParams } from "react-router-dom"
import { Navbar } from "../components/navbar"
import { useEffect, useState } from "react"
import axios from "axios"
import { url } from "../weburl"
import cattleIcon from '../icons/cattle.png'
import goatIcon from '../icons/goat.png'
import sheepIcon from '../icons/sheep.png'
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
            return Object.keys(animal).map((item) => {

                return <div className="col-span-6 md:col-span-2 p-5 ">
                    {item} : {animal[item]}
                </div>
            })
        }
    }

    return (
        <div className="justify-center text-center">
            <Navbar />
            <div className=" justify-center">
                <h1 className="flex flex-row justify-center items-center text-uppercase">
                    {animal && animal.type == "goat" &&
                        <img src={goatIcon} className="w-100" />}
                    {animal && animal.type == "sheep" &&
                        <img src={sheepIcon} className="w-100"/>}
                    {animal && animal.type == "cattle" &&
                        <img src={cattleIcon} className="w-100"/>}
                    {!animal ? params.id : animal.name} </h1>

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