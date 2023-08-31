import { Link, useNavigate, useParams } from "react-router-dom"
import { Navbar } from "../../components/navbar"
import { useEffect, useState } from "react"
import axios from "axios"
import { url } from "../../weburl"

import { AiFillDelete, AiOutlineDelete } from 'react-icons/ai'
import { Button } from "@mui/material"
import AlertDialogSlide from "../../components/add-record-modal"
import { deleteRecord } from "../../api/apis"
import { useDispatch } from "react-redux"
import { addMessage } from "../../redux/reducers/messages"
import Swal from "sweetalert2"
import RecentRecords from "../../components/recentRecords"
import CaGoat from "../../components/icons/CaGoat"
import CaSheep from "../../components/icons/CaSheep"
import CaCattle from "../../components/icons/CaCattle"
import CoverFlow from "../../components/Sliders/Coverflow"
import { styled } from "@stitches/react"
import PageSlide from "../../framer/pageSlide"
import SlideEnterToLeft from "../../framer/slideInWithGreen"
import Log from "../../components/log/log"
import { returnGender } from "../../utils/gender"
export const DetailView = (props) => {

    const params = useParams()
    const [animal, setAnimal] = useState([])
    const [sire, setSire] = useState([])
    const [dam, setDam] = useState([])
    const [recordEditted, setRecordEditted] = useState(0)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [recents, setRecents] = useState()
    const [recentsSp, setRecentsSp] = useState()

    useEffect(() => {
        axios
            .get(`${url}records/recent`)
            .then((res) => {
                setRecents(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

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

        axios
            .get(`${url}records/${animal.type}/recent`)
            .then((res) => {
                setRecentsSp(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
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
                <div className="p-5 px-10 flex flex-col gap-5">


                    <div className="flex flex-col
                    justify-start items-start  w-full ">

                        <div className="text-left flex gap-4 flex-wrap
                       capitalize ">
                            <p> tag colour: {animal['tag_colour'] || "N/A"}</p>
                            <p> number of kids: {animal['number_of_kids'] || "N/A"}</p>
                            


                            <p> Date Of Birth: {animal['date_of_birth'] || "N/A"}</p>
                            <p> Date Purchased: {animal['date_purchased'] || "N/A"}</p>


                        </div>


                    </div>



                    <div className="
                    
                    flex flex-col justify-start items-center lg:items-start capitalize text-left gap-4">
                       

                        <Log title="Weight" label="weight"/>

                        <Log title="Health Condition" label="health_condition" />

                        <Log title="Vaccination Info" label="vaccination_info"/>

                        <Log title="General Information" label="remarks"/>

                    </div>
                </div>

            )
        }
    }


    return (
        <Root className="justify-center text-center bg-[#446353fa]">
            <SlideEnterToLeft>
                <Navbar />
                <div className="justify-center">
                    <div className="grid grid-cols-5 py-20 justify-center items-center text-uppercase mb-5 detail-header gap-5">
                        <div className="flex flex-col col-span-5 lg:col-span-2
                        items-center">
                            {animal && animal.type == "goats" &&
                                <CaGoat />}
                            {animal && animal.type == "sheep" &&
                                <CaSheep />
                            }
                            {animal && animal.type == "cattle" &&
                                <CaCattle />
                            }

                            <h1 className="text-2xl font-bold uppercase"> {!animal ? params.id : animal.name}</h1>
                        </div>

                        <div className="flex  col-span-5 lg:col-span-1 flex-col  items-center lg:items-start gap-4 capitalize ">
                            <p> {returnGender(animal.type, "male")}: &nbsp;
                                {sire.id ?
                                    <Link to={`/dashboard/${sire.type}/${sire.id}`}>
                                        <span className="font-bold brand-green-font">{(sire && sire['name']) || "N/A"}</span>
                                    </Link>
                                    :
                                    <span className="font-bold brand-green-font">{(sire && sire['name']) || "N/A"}</span>
                                }

                            </p>

                            <p> {returnGender(animal.type, "female")}: &nbsp;
                                {dam.id ?
                                    <Link to={`/dashboard/${dam.type}/${dam.id}`}>
                                        <span className="font-bold brand-green-font">{(dam && dam['name']) || "N/A"}</span>
                                    </Link>
                                    :
                                    <span className="font-bold brand-green-font">{(dam && dam['name']) || "N/A"}</span>
                                }
                            </p>

                        </div>
                        <div className="flex-col flex 
                        col-span-5 lg:col-span-1 gap-4 lg:items-start">
                            <p>
                                Alive: <span className="brand-green-font font-bold">{animal['alive'] ? "yes" : "no"}</span>
                            </p>
                            <p>Sold: <span className="brand-green-font font-bold">{animal['alive'] ? "yes" : "no"}</span></p>
                        </div>

                        <div className="flex-col flex 
                        col-span-5 lg:col-span-1 gap-4 lg:items-start">
                            <p> castrated: <TextGreenBold>{animal['castrated'] ? "yes" : "no" || "N/A"}</TextGreenBold></p>

                            <p> gender: <TextGreenBold>{animal['gender'] || "N/A"}</TextGreenBold></p>

                            <p> colour: <span className="brand-green-font font-bold">{animal['colour'] || "N/A"}</span></p>
                        </div>
                    </div>

                    <div className="grid grid-cols-5">
                        <div className=" col-span-5 md:col-span-4 ">

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

                        <div className="mt-10 lg:mt-0 col-span-5 md:col-span-1 
                    
                    flex flex-col gap-10 justify-center items-center w-full">
                            <RecentRecords title='Recent Records' data={recents} />
                            <RecentRecords title={`Other ${animal.type || "records"}`}
                                data={recentsSp} />
                        </div>
                    </div>




                </div>


            </SlideEnterToLeft>
        </Root>
    )
}

const Root = styled('div', {
    "& .detail-header": {
        backgroundColor: "#8390891f",
        minHeight: "200px",
    },
})

const TextGreenBold = styled('p', {
    color: "#0FA958",
    fontWeight: "bold",
})