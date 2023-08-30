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
import { fetchRecord, updateRecord } from "../../views/detailView/api";
import { useParams } from "react-router-dom";
import { today } from "../../utils/date";


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

    const updateMutation = useMutation((data) => updateRecord(params.id, data))

    const { data, error, isLoading } = useQuery('record', () => fetchRecord(params.id));

    const [dataInput, setDataInput] = useState([]);

    const [record, setRecord] = useState([])

    useEffect(() => {
        switch (props.label) {
            case "weight":
                setRecord(data?.weight || []);
                break;
            case "health_condition":
                setRecord(data?.health_condition || []);
                break;
            case "vaccination_info":
                setRecord(data?.vaccination_info || []);
                break;
            case "remarks":
                setRecord(data?.remarks || []);
                break;
            default:
                break;
        }
    }, [props.label, data]);






    const handleOnChange = (e) => {
        let value = e.target.value
        let name = e.target.name
        setDataInput({ ...dataInput, [name]: value })
    }


    const handleUpdate = async () => {
        const updatedData = [
            ...record,
            dataInput // Add the new item to the array
        ]
        const updatePayload = {
            [props.label]: updatedData // Create an object with the label as the key
        };
        const updatedItem = await updateMutation.mutateAsync(updatePayload);
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
                <BiSolidBookAdd color="#0FA958" size={30} />
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
                            handleOnChange={handleOnChange} />



                        </div>

                        <div className='flex flex-col  gap-3 xl:gap-6'>




                            <Textarea placeholder={props.type} minRows={4} name={"content"}
                                onChange={handleOnChange} />


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