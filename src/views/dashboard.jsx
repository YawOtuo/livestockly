import { useEffect, useState } from "react"
import AlertDialogSlide from "../components/add-record-modal"
import { MobileNav, Navbar } from "../components/navbar"
import { RecordCard } from "../components/record-card"
import { Search } from "../components/dash-search"
import cattleIcon from '../icons/cattle.png'
import goatIcon from '../icons/goat.png'
import sheepIcon from '../icons/sheep.png'
import axios from "axios"
import { url } from "../weburl"
import { DashSearch } from "../components/dash-search"
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment } from "../redux/reducers/counter"
import SimpleSnackbar from "../components/toast/success"
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import { useMediaQuery } from "@mui/material"
import Layout from "./layout"
import SlideEnter from "../framer/slideEnter"
import { useQuery } from "react-query"
import { getRecordSp } from "../api/recordsApi"

export const Dashboard = () => {

    const notify = (message) => toast.success(message);

    const [numberOfGoats, setNumberOfGoats] = useState(0)
    const [numberOfSheep, setNumberOfSheep] = useState(0)
    const [numberOfCattle, setNumberOfCattle] = useState(0)

    const message = useSelector((state) => state.messages.message)
    const dispatch = useDispatch()
    const matches = useMediaQuery('(max-width: 800px')

    const { sheep, error, isLoading } = useQuery('record', () => getRecordSp('sheep'));
    const { goats } = useQuery('record', () => getRecordSp('goats'));
    const { cattle } = useQuery('record', () => getRecordSp('cattle'));

    const userData = useSelector((state) => state.users?.user)
    const userName = userData?.username


    useEffect(() => {
        if (userData) {
            notify(`Welcome back ${userName}`)
            axios
                .get(`${url}records/goats/count`)
                .then(res => {
                    console.log(res.data)
                    setNumberOfGoats(res.data)}
                    )
                .catch((err => console.log(err)))

            axios
                .get(`${url}records/cattle/count`)
                .then(res => setNumberOfCattle(res.data))
                .catch((err => console.log(err)))

            axios
                .get(`${url}records/sheep/count`)
                .then(res => setNumberOfSheep(res.data))
                .catch((err => console.log(err)))
        }

    }, [userData])


    return (
        <Layout>
            {matches ? <MobileNav /> : <Navbar />}


            <SlideEnter>
                <div className="flex flex-col justify-center items-center w-full  md:mt-0">
                    <div className="w-full">
                        <div className=""> <DashSearch /></div>
                    </div>
                    <div className=" w-4/5 md:w-3/5 " >
                        <div className="mb-10 md:mb-0 ">

                            <div className=""><RecordCard number={numberOfGoats} type="goats" icon={goatIcon} /></div>
                        </div>
                        <div className="mb-10 md:mb-0">
                            <div className=""><RecordCard number={numberOfSheep} type="sheep" icon={sheepIcon} /></div>
                        </div>
                        <div className="mb-10 md:mb-0">
                            <div className=""><RecordCard number={numberOfCattle} type="cattle" icon={cattleIcon} /></div>
                        </div>
                    </div>
                </div>

            </SlideEnter>

        </Layout>

    )
}