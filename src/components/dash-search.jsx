import axios from "axios"
import { useEffect, useState } from "react"
import { url } from "../weburl"
import cattleIcon from '../icons/cattle.png'
import goatIcon from '../icons/goat.png'
import sheepIcon from '../icons/sheep.png'
import { Link, useNavigate } from "react-router-dom"
import CaGoat from "./icons/CaGoat"
import CaSheep from "./icons/CaSheep"
import CaCattle from "./icons/CaCattle"

export const DashSearch = (props) => {

    const [searchInput, setSearchInput] = useState()
    const [searchResults, setSearchResults] = useState([])
    const [noSearchResultFound, setNoSearchResultFound] = useState(false)
    const navigate = useNavigate()
    useEffect(() => {
        if (searchInput) {
            axios
                .post(`${url}records/any/search`, { query: searchInput })
                .then((res) => {
                    setNoSearchResultFound(false)
                    setSearchResults(res.data)
                })
                .catch((err) => setNoSearchResultFound(true))
        }
    }, [searchInput])

    const onSearchInputChange = (e) => {
        setSearchInput(e.target.value)
    }


    const displayResults = () => {
        return searchResults.map((item) => {
            return (

                <button className="flex flex-row items-center gap-2 py-10 lg:py-20 px-5 min-w-[300px] "
                    onClick={e =>
                        navigate(`/dashboard/${item['type']}/${item['id']}`)
                    }
                >
                    {item['type'] == 'goats' && <CaGoat />}
                    {item['type'] == 'sheep' && <CaSheep />}
                    {item['type'] == 'cattle' && <CaCattle />}

                    {item['name']}

                </button>
            )

        })
    }




    return (
        <div className="w-full mb-10 flex flex-col 
        justify-center items-center">
            <input type="text"
                onChange={e => onSearchInputChange(e)}

                placeholder="Search" className="
            w-4/5 md:w-1/2 
             py-2 pl-5 pr-2 dash-search"></input>


            {noSearchResultFound ?
                <p>No results found</p>
                :
                <div className="flex flex-wrap w-full justify-center bg-slate-200">
                    {displayResults()}
                </div>}
        </div>
    )
}