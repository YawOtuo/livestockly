import { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import addIcon from '../icons/add.png'
import editIcon from '../icons/edit.png'
import axios from 'axios';
import { url } from '../weburl';
import { SearchResultCard } from "./search-result-card";

export const SelectSireModal = (props) => {
    const [open, setOpen] = useState(false);
    const [searchInput, setSearchInput] = useState()
    const [searchResults, setSearchResults] = useState([])
    const [noSearchResultFound, setNoSearchResultFound] = useState(false)

    const sires = [
        "sire1", "sire22", "sire3", "sire4"
    ]

    useEffect(() => {
        if (searchInput) {
            axios
                .post(`${url}records/${props.type}/search`, { query: searchInput })
                .then((res) => {
                    setNoSearchResultFound(false)
                    setSearchResults(res.data)
                })
                .catch((err) => setNoSearchResultFound(true))
        }
    }, [searchInput])

    useEffect(() => {

    }, [searchInput])

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };



    const displaySires = () => {
        return searchResults.map((item) => {
            return <button className="col-span-1" onClick={e => {
                e.preventDefault()
                props.setParent({ id: item['id'], name: item['name'] })
                handleClose()
            }

            }>
                <SearchResultCard name={item['name']} />
            </button>


        })
    }

    const onSearchInputChange = (e) => {
        setSearchInput(e.target.value)
    }

    return (
        <div>
            <Button variant="standard" onClick={handleClickOpen}>
                {
                    <p className="uppercase">Select {props.name}</p>
                }
            </Button>
            <Dialog
                open={open}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>Select {props.name}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        <div className="justify-center items-center flex flex-col">
                            <input type="text" placeholder="Search"
                                onChange={e => onSearchInputChange(e)} className=" px-2 search-input" />
                            <div c5lassName="grid grid-cols-3 py-2
                                w-full justify-center items-center">
                                {noSearchResultFound ?

                                    <p className="alig">No Search Result found</p>

                                    :

                                    displaySires()
                                }
                            </div>
                        </div>
                    </DialogContentText>
                </DialogContent>

            </Dialog>
        </div>
    )
}