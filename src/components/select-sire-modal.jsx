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

export const SelectSireModal = () => {
    const [open, setOpen] = useState(false);

    const sires = [
        "sire1", "sire22", "sire3", "sire4"
    ]

    useEffect(() => {
        //search url
    }, [])

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const displaySires = () => {
        return sires.map((item) => {
            return <div className="col-span-4 w-full">
                {item}
            </div>
        })
    }

    return (
        <div>
            <Button variant="standard" onClick={handleClickOpen}>
                {
                    <p>Select Sire</p>
                }
            </Button>
            <Dialog
                open={open}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>Select Sire</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        <div className="justify-center items-center flex flex-col">
                            <input type="text" />
                                <div className="grid grid-cols-12 
                                w-full justify-center items-center">
                                    {displaySires()}
                                </div>
                        </div>
                    </DialogContentText>
                </DialogContent>

            </Dialog>
        </div>
    )
}