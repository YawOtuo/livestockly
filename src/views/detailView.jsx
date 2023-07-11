import { Link, useNavigate, useParams } from "react-router-dom"
import { Navbar } from "../components/navbar"
import { useEffect, useState } from "react"
import axios from "axios"
import { url } from "../weburl"
import cattleIcon from '../icons/cattle.png'
import goatIcon from '../icons/goat.png'
import sheepIcon from '../icons/sheep.png'
import { AiFillDelete, AiOutlineDelete } from 'react-icons/ai'
import bulletIcon from '../icons/bullet.png'
import deleteIcon from '../icons/delete.png'


import { Button } from "@mui/material"
import AlertDialogSlide from "../components/add-record-modal"
import { deleteRecord } from "../api/apis"
import { useDispatch } from "react-redux"
import { addMessage } from "../redux/reducers/messages"
export const DetailView = (props) => {

    const params = useParams()
    const [animal, setAnimal] = useState([])
    const [sire, setSire] = useState([])
    const [dam, setDam] = useState([])
    const [recordEditted, setRecordEditted] = useState(0)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        axios
            .get(`${url}records/${params.id}`)
            .then((res) => {
                setAnimal(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [recordEditted])

    useEffect(() => {
        if (animal && animal.id) {
            animal.sire && getSire(animal.sire)
            animal.dam && getDam(animal.dam)
        }
    }, [animal])


    const getSire = (id) => {
        axios
            .get(`${url}records/${id}`)
            .then((res) => {
                setSire(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const getDam = (id) => {
        axios
            .get(`${url}records/${id}`)
            .then((res) => {
                setDam(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const _deleteRecord = () => {
        deleteRecord(animal.id)
        .then((res)=> {
            navigate('/dashboard')
            dispatch(addMessage("Deleted Record"))
        })
        .catch((err)=> console.log(err))
    }

    
    const displayInfo = () => {
        if (animal) {

            return (
                <div className=" items-center justify-center  w-3/5 md:w-2/5">
                    <div className=" flex  flex-col md:flex-row justify-center  capitalize mb-5 leading-10">

                        <div className=" w-full text-left">

                            <p> tag colour: {animal['tag_colour'] || "N/A"}</p>
                            <p> number of kids: {animal['number_of_kids'] || "N/A"}</p>
                            <p> weight: {animal['weight'] || "N/A"}</p>
                            <p> colour: {animal['colour'] || "N/A"}</p>
                            <p> castrated: {animal['castrated'] || "N/A"}</p>



                        </div>
                        <div className="w-full text-left">
                            <p> health condition: {animal['health_condition'] || "N/A"}</p>
                            <p> Date Of Birth: {animal['date_of_birth'] || "N/A"}</p>
                            <p> Date Purchased: {animal['date_purchased'] || "N/A"}</p>
                            <p> Alive: {animal['colour'] || "N/A"}</p>
                            <p> Sold: {animal['colour'] || "N/A"}</p>
                            <p> vaccination info: <span className="">{animal['vaccination_info'] || "N/A"}</span></p>


                        </div>



                    </div>
                    <hr />

                    <div className="w-full capitalize mt-5">
                    
                        <p> remarks: <span className="brand-green-font font-bold">{animal['remarks'] || "N/A"}</span></p>

                    </div>


                </div>

            )
        }
    }

    return (
        <div className="justify-center text-center">
            <Navbar />
            <div className=" justify-center">
                <div className="flex flex-col justify-center items-center text-uppercase mb-5">
                    {animal && animal.type == "goats" &&
                        <img src={goatIcon} className="w-100" />}
                    {animal && animal.type == "sheep" &&
                        <img src={sheepIcon} className="w-100" />}
                    {animal && animal.type == "cattle" &&
                        <img src={cattleIcon} className="w-100" />}
                    <div className="flex flex-col">
                        <h1 className="font-xl font-bold uppercase"> {!animal ? params.id : animal.name}</h1>
                        <div className="flex gap-10 capitalize pt-4">
                            <p> sire: &nbsp;
                                {sire.id ?
                                    <Link to={`/dashboard/${sire.type}/${sire.id}`}>
                                        <span className="font-bold brand-green-font">{(sire && sire['name']) || "N/A"}</span>
                                    </Link>
                                    :
                                    <span className="font-bold brand-green-font">{(sire && sire['name']) || "N/A"}</span>
                                }

                            </p>

                            <p> dam: &nbsp;
                                {dam.id ?
                                    <Link to={`/dashboard/${dam.type}/${dam.id}`}>
                                        <span className="font-bold brand-green-font">{(dam && dam['name']) || "N/A"}</span>
                                    </Link>
                                    :
                                    <span className="font-bold brand-green-font">{(dam && dam['name']) || "N/A"}</span>
                                }
                            </p>

                        </div>
                    </div>
                </div>

                <hr />

                <div className=" my-6 flex flex-col">
                    <div className="
                    justify-center items-center flex ">
                        {displayInfo()}
                    </div>
                </div>

                <hr />
                <div className="justify-center items-center flex flex-row gap-10 pt-5">
                    <div className="flex uppercase items-center">
                        <AlertDialogSlide edit={true} type={animal && animal.type} record={animal}
                            setRecordEditted={setRecordEditted} recordEditted={recordEditted} />
                        Edit
                    </div>
                    <div className="flex uppercase items-center">
                        <AiOutlineDelete color="0FA958" size={30} onClick={_deleteRecord} />
                        Delete
                    </div>
                </div>

            </div>
        </div>
    )
}