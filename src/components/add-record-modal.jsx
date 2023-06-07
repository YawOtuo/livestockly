import React, { useEffect } from 'react';
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


const Transition = React.forwardRef(function Transition(
  props,
  ref
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide(props) {
  const [open, setOpen] = React.useState(false);
  const [record, setRecord] = React.useState({ type: props.type, sire: null, dam: null })
  const [sire, setSire] = React.useState({id: null, name: null})
  const [dam, setDam] = React.useState({id: null, name: null})


  useEffect(() => {
    if (props.edit) {
      setRecord(props.record)
      console.log('setting record')
    }

    console.log(record.name)
  }, [props.record])

  

  useEffect(()=> {
    if(sire.id){
      setRecord({ ...record, sire: sire.id })
    }
    if(dam.id){
      setRecord({ ...record, dam: dam.id })
    }

}, [sire, dam])

  const handleOnChange = (e) => {
    let value = e.target.value
    let name = e.target.name
    setRecord({ ...record, [name]: value })
  }
  const submitRecord = () => {
    axios
      .post(`${url}records`,
        record
      )
      .then((res) => {
        handleClose()
      })
      .catch((err) => console.log(err))
  }

  const updateRecord = () => {
    if (props.record.id) {
      axios
        .post(`${url}records/${props.record.id}`,
          record
        )
        .then((res) => {
          handleClose()

          // need a value to update the state with so that it reloads
          props.setRecordEditted(props.recordEditted + 1)
        })
        .catch((err) => console.log(err))
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
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{props.edit ?
          "EDIT RECORD"
          : `NEW RECORD (${props.type})`
        }</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description" className='text-black'>
            <div className='py-1 flex flex-row '>
              <label className='flex flex-row items-center '>
                Name/Tag</label>
              <input type='text' name='name'
                value={record.name}
                onChange={e => handleOnChange(e)}></input>

            </div>
            <div className='py-1 flex flex-row'>
              <label className='flex flex-row items-center '>
                Tag Colour</label>
              <input type='text' name="tag_colour"
                onChange={e => handleOnChange(e)} ></input>

            </div>
            <div className='flex flex-row'>
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


            <div className='py-1 flex flex-row'>
              <label className='flex flex-row items-center '>
                Number of Kids</label>
              <input type='text'
                name="number_of_kids"
                onChange={e => handleOnChange(e)}
              ></input>

            </div>
            <div className='py-1 flex flex-row'>
              <label className='flex flex-row items-center '>
                Gender</label>
              <input type='text'
                name='gender'
                onChange={e => handleOnChange(e)}
              ></input>

            </div>
            <div className='py-1 flex flex-row'>
              <label className='flex flex-row items-center '>
                Colour</label>
              <input type='text' name='colour'
                onChange={e => handleOnChange(e)}></input>

            </div>
            <div className='py-1 flex flex-row'>
              <label className='flex flex-row items-center '>
                Castrated</label>
              <input type='text' name='castrated'
                onChange={e => handleOnChange(e)}></input>

            </div>
            <div className='py-1 flex flex-row'>
              <label className='flex flex-row items-center '>
                Health Condition</label>
              <input type='text' name="health_condition"
                onChange={e => handleOnChange(e)}></input>

            </div>
            <div className='py-1 flex flex-row items-between'>
              <label className='flex flex-row items-center '>
                Remarks</label>
              <input type='text' name='remarks'
                onChange={e => handleOnChange(e)}></input>

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
    </div>
  );
}
