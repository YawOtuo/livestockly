import { useEffect, useState } from "react"
import AlertDialogSlide from "../components/add-record-modal"
import { Navbar } from "../components/navbar"
import { RecordCard } from "../components/record-card"
import { Search } from "../components/dash-search"
import cattleIcon from '../icons/cattle.png'
import goatIcon from '../icons/goat.png'
import sheepIcon from '../icons/sheep.png'
import axios from "axios"
import { url } from "../weburl"
import { DashSearch } from "../components/dash-search"

export const Dashboard = () => {
    const [numberOfGoats, setNumberOfGoats] = useState(0)
    const [numberOfSheep, setNumberOfSheep] = useState(0)
    const [numberOfCattle, setNumberOfCattle] = useState(0)


    useEffect(()=>{
        axios
        .get(`${url}records/goats/count`)
        .then(res => setNumberOfGoats(res.data))
        .catch((err => console.log(err)))

        axios
        .get(`${url}records/cattle/count`)
        .then(res => setNumberOfCattle(res.data))
        .catch((err => console.log(err)))

        axios
        .get(`${url}records/sheep/count`)
        .then(res => setNumberOfSheep(res.data))
        .catch((err => console.log(err)))
    }, [])
    
    return (
        <div>
            <Navbar/>

          <div className="flex flex-col justify-center items-center h-full">
                <div className="w-full">
                   <div className=""> <DashSearch/></div>
                </div>
             <div className=" w-4/5 md:w-3/5" >
                    <div className="mb-10 md:mb-0">
        
                        <div className=""><RecordCard number={numberOfGoats} type="goats" icon={goatIcon}/></div>
                    </div>
                    <div className="mb-10 md:mb-0">
                        <div className=""><RecordCard  number={numberOfSheep} type="sheep" icon={sheepIcon} /></div>
                    </div>
                    <div className="mb-10 md:mb-0">
                        <div className=""><RecordCard  number={numberOfCattle}  type="cattle" icon={cattleIcon} /></div>
                    </div>
             </div>
          </div>
        </div>

    )
}