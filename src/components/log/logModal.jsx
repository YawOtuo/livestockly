import { Button, Dialog, DialogContent, DialogContentText, DialogTitle, Slide } from "@mui/material"
import { styled } from "@stitches/react"
import { TextField } from "../textfield"
import { Textarea } from "@mui/joy"
import React, { useEffect, useState } from "react";
import { url } from "../../weburl";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addMessage } from "../../redux/reducers/messages";
import { BiSolidBookAdd } from "react-icons/bi";
import { useMutation, useQuery } from "react-query";
import { fetchRecord, updateRecord, updateRecordJSON } from "../../views/detailView/api";
import { useParams } from "react-router-dom";
import { today } from "../../utils/date";
import { AiOutlineEdit } from "react-icons/ai";


const Transition = React.forwardRef(function Transition(
    props,
    ref
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const LogModal = (props) => {
    const [open, setOpen] = React.useState(false);
    const params = useParams();
    const dispatch = useDispatch();

    const [dataInput, setDataInput] = useState([]);

    const [record, setRecord] = useState([])

    useEffect(() => {
        if (props.edit) {
            switch (props.label) {
                case "weight":
                    setDataInput(props.data)
                    break;
                case "health_condition":
                    setDataInput(props.data)
                    break;
                case "vaccination_info":
                    setDataInput(props.data)
                    break;
                case "remarks":
                    setDataInput(props.data)
                    break;
                default:
                    break;
            }
        }
    }
        , [props.edit])

    const handleOnChange = (e) => {
        let value = e.target.value
        let name = e.target.name
        setDataInput({ ...dataInput, [name]: value })
    }


    const handleUpdate = async () => {
        console.log([props.label])
        updateRecordJSON(params.id, [dataInput], props.label)
        handleClose()
    };
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Root>
            <button onClick={handleClickOpen}>

                {
                    props.icon == 'edit' && <AiOutlineEdit color="" size={20} />
                }
                {
                    props.icon == 'add' && <BiSolidBookAdd color="#0FA958" size={30} />
                }
            </button>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                maxWidth={'sm'}
                fullWidth

                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle className='shadow-md uppercase brand-green-font'>{props?.edit ?
                    `EDIT ${props?.type}`
                    : `ADD ${props?.type}`
                }</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description"
                        className='pt-4 text-black'>

                        <div className='flex flex-col gap-2 lg:gap-6'>
                            <TextField label={"date"} type="text" name="date"
                                handleOnChange={handleOnChange}
                                value={dataInput && dataInput['date']}
                            />

                        </div>

                        <div className='flex flex-col  gap-3 xl:gap-6'>




                            <Textarea placeholder={props.type} minRows={4} name={"content"}
                                onChange={handleOnChange}
                                value={dataInput && dataInput['content']}
                            />


                        </div>




                    </DialogContentText>
                </DialogContent>

                <div className='w-full text-center brand-green-bg '>
                    <Button onClick={() => handleUpdate()} className='w-full'>
                        <span className='text-white'>
                            {
                                props?.edit ?
                                    "EDIT"
                                    : "ADD"
                            }
                        </span>
                    </Button>
                </div>
            </Dialog>
        </Root>
    )
}

const Root = styled('div', {

})

export default LogModal