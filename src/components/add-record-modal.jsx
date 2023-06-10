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
import { TextField } from './textfield';



const Transition = React.forwardRef(function Transition(
  props,
  ref
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide(props) {
  const [open, setOpen] = React.useState(false);
  const [record, setRecord] = React.useState({ type: props.type, sire: null, dam: null })
  const [sire, setSire] = React.useState({ id: null, name: null })
  const [dam, setDam] = React.useState({ id: null, name: null })


  useEffect(() => {
    if (props.edit) {
      setRecord(props.record)
      console.log('setting record')
    }

    console.log(record.name)
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
        <DialogTitle className='shadow-md '>{props.edit ?
          "EDIT RECORD"
          : `NEW RECORD (${props.type})`
        }</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description"
           className='pt-4 text-black'>

     
            <TextField label={"name"} value={record.name} type="text" name="name" handleOnChange={handleOnChange} />


            <TextField label={"tag colour"}  value={record.tag_colour}  type="text" name="tag_colour" handleOnChange={handleOnChange} />

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
            <TextField label={"colour"} value={record.colour}  name="colour" type="text" handleOnChange={handleOnChange} />


            <TextField label={"health condition"}  value={record.health_condition} name="health condition" 
            type="text" handleOnChange={handleOnChange} />
            <TextField label={"number of kids"}  value={record.number_of_kids} name="number_of_kids" 
            type="number" handleOnChange={handleOnChange} />
            <TextField label={"weight"}  value={record.weight}  name="weight" 
            type="number" handleOnChange={handleOnChange} />
            <TextField label={"date of birth"} name="date_of_birth" 
            type="text" value={record.date_of_birth}  handleOnChange={handleOnChange} />

            <div className='text-black flex flex-row py-1'>
              <div className=''>
                Gender
              </div>
              <div className='mx-3 flex flex-row gap-2'>
                <input type="radio" id="html" name="gender" value="male" />
                <label for="html">male</label>
                <input type="radio" id="css" name="gender" value="female" />
                <label for="css">female</label>
              </div>

            </div>



            <div className='text-black flex flex-row py-1'>
              <div className=''>
                Castrated
              </div>
              <div className='mx-3 flex flex-row gap-2'>
                <input type="radio" id="html" name="gender" value="male" />
                <label for="html">yes</label>
                <input type="radio" id="css" name="gender" value="female" />
                <label for="css">no</label>
              </div>

            </div>

            <TextField label={"remarks"} type="text" value={record.remarks}  name="remarks" handleOnChange={handleOnChange} />
       

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
