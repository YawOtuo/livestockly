import { Link, useNavigate, useParams } from "react-router-dom"
import { Navbar } from "../components/navbar"
import { useEffect, useState } from "react"
import axios from "axios"
import { url } from "../weburl"
import cattleIcon from '../icons/cattle.png'
import goatIcon from '../icons/goat.png'
import sheepIcon from '../icons/sheep.png'
import { AiFillDelete, AiOutlineDelete } from 'react-icons/ai'


import { Button } from "@mui/material"
import AlertDialogSlide from "../components/add-record-modal"
import { deleteRecord } from "../api/apis"
import { useDispatch } from "react-redux"
import { addMessage } from "../redux/reducers/messages"
import Swal from "sweetalert2"
import RecentRecords from "../components/recentRecords"
import CaGoat from "../components/icons/CaGoat"
import CaSheep from "../components/icons/CaSheep"
import CaCattle from "../components/icons/CaCattle"
import CoverFlow from "../components/Sliders/Coverflow"
import { styled } from "@stitches/react"
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

        Swal.fire({
            title: 'Are you sure you want to delete?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Delete',
            denyButtonText: `Don't Delete`,
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire('Deleted!', '', 'success')
                deleteRecord(animal.id)
                    .then((res) => {
                        navigate('/dashboard')
                        dispatch(addMessage("Deleted Record"))

                    })
                    .catch((err) => console.log(err))
            } else if (result.isDenied) {
                Swal.fire('Changes are not saved', '', 'info')
            }
        })

    }


    const displayInfo = () => {
        if (animal) {

            return (
                <div className="grid grid-cols-2">


                    <div className="flex flex-col
                    justify-start items-center  w-full ">

                        <div className="text-left flex flex-col gap-4
                       capitalize">
                            <p> tag colour: {animal['tag_colour'] || "N/A"}</p>
                            <p> number of kids: {animal['number_of_kids'] || "N/A"}</p>
                            <p> weight: {animal['weight'] || "N/A"}</p>
                            <p> colour: {animal['colour'] || "N/A"}</p>
                            <p> castrated: {animal['castrated'] || "N/A"}</p>

                            <p> Date Of Birth: {animal['date_of_birth'] || "N/A"}</p>
                            <p> Date Purchased: {animal['date_purchased'] || "N/A"}</p>


                        </div>


                    </div>



                    <div className="flex flex-col justify-start capitalize text-left gap-4">
                        <p> health condition: {animal['health_condition'] || "N/A"}</p>
                        <p> vaccination info: <span className="">{animal['vaccination_info'] || "N/A"}</span></p>
                        <p> remarks: <span className="brand-green-font ">{animal['remarks'] || "N/A"}</span></p>

                    </div>
                </div>

            )
        }
    }


    return (
        <Root className="justify-center text-center">
            <Navbar />
            <div className="col-span-4 justify-center">
                <div className="flex justify-around items-center text-uppercase mb-5 detail-header">
                    <div className="flex flex-col">
                        {animal && animal.type == "goats" &&
                            <CaGoat />}
                        {animal && animal.type == "sheep" &&
                            <CaSheep />
                        }
                        {animal && animal.type == "cattle" &&
                            <CaCattle />
                        }

                        <h1 className="font-xl font-bold uppercase"> {!animal ? params.id : animal.name}</h1>
                    </div>

                    <div className="flex flex-col gap-4 capitalize ">
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
                    <div className="flex-col flex gap-4">
                        <p>
                            Alive:
                        </p>
                        <p>Sold</p>
                    </div>
                </div>

                <div className="grid grid-cols-5">
                    <div className="col-span-4 ">

                        {displayInfo()}
                        <div className="px-10">
                            <CoverFlow />
                        </div>
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

                    <div className="col-span-1 
                
                flex flex-col gap-10 justify-start">
                        <RecentRecords title='Recent Records' />
                        <RecentRecords title='Other Records' />
                    </div>
                </div>




            </div>

        </Root>
    )
}

const Root = styled('div', {
    "& .detail-header": {
        backgroundColor: "#8390891f",
        minHeight: "200px",
    },
})