import { useEffect, useState } from "react"
import { Navbar } from "../components/navbar"
import { TagCard } from "../components/tag-card"
import axios from "axios"
import { url } from "../weburl"
import { useParams } from "react-router-dom"
import Layout from "./layout"
import SlideEnter from "../framer/slideEnter"
import { DashSearch } from "../components/dash-search"
import AddRecordModal from "../components/add-record-modal"

export const ListView = (props) => {
    const [animals, setAnimals] = useState()
    const params = useParams()
    const [number, setNumber] = useState(0)

    let type = params.type
    useEffect(() => {
        axios
            .get(`${url}records/${type}`)
            .then((res) => {
            setAnimals(res.data)
                setNumber(res.data.length)
                console.log(res)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    // const animals = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

    const renderList = () => {
        if (animals) {
            return animals.map((item) => {
                return <div className="col-start-2 col-span-10 md:col-span-3 items-center">
                    <TagCard id={item['id']} type={item['type']} name={item['name']} />
                </div>

            })
        }

    }

    return (
        <Layout>
            <Navbar />
            <SlideEnter>
                <div className="container mx-auto text-center ">
                    <DashSearch/>

                    <div className="pb-3 flex items-center justify-center">
                        <p>Displaying all<span className="brand-green-font"> {number}</span> {type} 
                        </p>
                         <AddRecordModal type={type}/>
                    </div>
                    <div className="">
                        <div className="grid grid-cols-12 
                        gap-4 justify-center items-center">
                            {renderList()}
                        </div>
                    </div>
                </div>
            </SlideEnter>
        </Layout>
    )
}