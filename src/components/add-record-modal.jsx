import React, { useEffect, useState } from 'react';
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

import nestTag from '../icons/nest-tag.png'
import axios from 'axios';
import { url } from '../weburl';
import { SelectSireModal } from './select-sire-modal';
import { TextField } from './textfield';
import { LoadingModal } from './loading-modal';
import { useSelector, useDispatch } from 'react-redux'
import { addMessage } from '../redux/reducers/messages';
import { Textarea } from '@mui/joy';



const Transition = React.forwardRef(function Transition(
  props,
  ref
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddRecordModal(props) {
  const [open, setOpen] = React.useState(false);
  const [record, setRecord] = React.useState({ type: props.type, sire: null, dam: null })
  const [sire, setSire] = React.useState({ id: null, name: null })
  const [dam, setDam] = React.useState({ id: null, name: null })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState()
  const dispatch = useDispatch()

  useEffect(() => {
    if (props.edit) {
      setRecord(props.record)
      console.log('setting record')
    }

  }, [props.record])



  useEffect(() => {
    if (sire.id) {
      setRecord({ ...record, sire: sire.id })
    }
    if (dam.id) {
      setRecord({ ...record, dam: dam.id })
    }

  }, [sire, dam])



  const handleOnChange = (e) => {
    let value = e.target.value
    let name = e.target.name
    setRecord({ ...record, [name]: value })
  }
  const submitRecord = () => {
    setLoading(true)
    axios
      .post(`${url}records`,
        record
      )
      .then((res) => {
        handleClose()

        setLoading(false)
        dispatch(addMessage("successfully created Record"))

      })
      .catch((err) => {
        console.log(err)
        setError(err)
      })
  }

  const updateRecord = () => {
    if (props.record.id) {
      setLoading(true)
      axios
        .post(`${url}records/${props.record.id}`,
          record
        )
        .then((res) => {
          handleClose()
          setLoading(false)
          dispatch(addMessage("Successfully updated record of " + props.record.name))



          // need a value to update the state with so that it reloads
          props.setRecordEditted(props.recordEditted + 1)
        })
        .catch((err) => {
          setError(err)
          console.log(error)
        })
    }

  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="standard" onClick={handleClickOpen}>
        {
          props.edit ?
            <img src={editIcon} width="90%" />

            :
            <img src={addIcon} width="40%" />
        }
      </Button>
      {!loading ?
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          maxWidth={'lg'}
          fullWidth

          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle className='shadow-md '>{props.edit ?
            "EDIT RECORD"
            : `NEW RECORD (${props.type})`
          }</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description"
              className='pt-4 text-black grid grid-cols-2'>

              <div className='col-span-2 lg:col-span-1 flex flex-col gap-2 lg:gap-6'>
                <TextField label={"tag name"} value={record.name} type="text" name="name" handleOnChange={handleOnChange} />


                <TextField label={"tag colour"} value={record.tag_colour} type="text" name="tag_colour" handleOnChange={handleOnChange} />


                <TextField label={"colour"} value={record.colour} name="colour" type="text" handleOnChange={handleOnChange} />
                <TextField label={"health condition"} value={record.health_condition} name="health_condition"
                  type="text" handleOnChange={handleOnChange} />
                <TextField label={"number of kids"} value={record.number_of_kids} name="number_of_kids"
                  type="number" handleOnChange={handleOnChange} />

                <TextField label={"weight"} value={record.weight} name="weight"
                  type="number" handleOnChange={handleOnChange} />
                <TextField label={"date of birth"} name="date_of_birth"
                  type="text" value={record.date_of_birth} handleOnChange={handleOnChange} />


              </div>
              <div className='flex flex-col col-span-2 lg:col-span-1 gap-3 xl:gap-6'>

                <div className='flex flex-row text-black'>
                  <div>
                    Sire: {sire.name}
                    <SelectSireModal
                      setParent={setSire}
                      type={props.type} name='sire' />

                  </div>

                  <div>
                    Dam: {dam.name}
                    <SelectSireModal t
                      setParent={setDam}
                      type={props.type} name='dam' />

                  </div>
                </div>


                <div className='text-black flex flex-row py-1'>
                  <div className=''>
                    Gender
                  </div>
                  <div className='mx-3 flex flex-row gap-2'>
                    <input type="radio" id="html" name="gender" value="male" 
                    onChange={handleOnChange} />
                    <label for="html">male</label>
                    <input type="radio" id="css" name="gender" value="female" onChange={handleOnChange}  />
                    <label for="css">female</label>
                  </div>

                </div>

                <div className='text-black flex flex-row py-1'>
                  <div className=''>
                    Castrated
                  </div>
                  <div className='mx-3 flex flex-row gap-2'>
                    <input type="radio" id="html" name="castrated" value="yes" onChange={handleOnChange} />
                    <label for="html">yes</label>
                    <input type="radio" id="css" name="castrated" value="no" onChange={handleOnChange} />
                    <label for="css">no</label>
                  </div>

                </div>
                <div className='mb-5'> <Textarea placeholder='Vaccination Info' name='vaccination_info' minRows={4} onChange={handleOnChange} value={record.vaccination_info} /></div>

                <Textarea placeholder='Remarks' minRows={4} name='remarks'
                onChange={handleOnChange} value={record.remarks} />

                <input type='file'/>

              </div>




            </DialogContentText>
          </DialogContent>

          <div className='w-full text-center brand-green-bg '>
            <Button onClick={props.edit ? updateRecord : submitRecord} className='w-full'>
              <span className='text-white'>
                {
                  props.edit ?
                    "EDIT"
                    : "ADD"
                }
              </span>
            </Button>
          </div>
        </Dialog>
        :
        <LoadingModal open={loading} />
      }
    </div>
  );
}
