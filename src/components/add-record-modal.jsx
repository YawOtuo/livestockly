import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import addIcon from '../icons/add.png'
import nestTag from '../icons/nest-tag.png'
import axios from 'axios';
import { url } from '../weburl';


const Transition = React.forwardRef(function Transition(
  props,
  ref
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide(props) {
  const [open, setOpen] = React.useState(false);
  const [record, setRecord] = React.useState({type: props.type})

  const handleOnChange = (e) => {
    let value = e.target.value
    let name = e.target.name
    setRecord({...record, [name]:  value})
  }
  const submitRecord = () => {
    axios
    .post(`${url}records`,
     record
     )
    .then((res)=>{
      handleClose()
    })
    .catch((err)=>console.log(err))
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
        <img src={addIcon} width="40%" />
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"NEW RECORD"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <div className='py-1 flex flex-row'>
              <label className='flex flex-row items-center '>
                Name/Tag</label>
              <input type='text' name='name'
               onChange={e=> handleOnChange(e)}></input>

            </div>
            <div className='py-1 flex flex-row'>
              <label className='flex flex-row items-center '>
                Tag Colour</label>
              <input type='text' name="tag_colour"
               onChange={e=> handleOnChange(e)} ></input>

            </div>
            {/* <div className='py-1 flex flex-row'>
              <label className='flex flex-row items-center '>
                Sire</label>
              <input type='text'
               onChange={e=> handleOnChange(e)}></input>

            </div> */}
            {/* <div className='py-1 flex flex-row'>
              <label className='flex flex-row items-center '>
                Dam</label>
              <input type='text'></input>

            </div> */}
            <div className='py-1 flex flex-row'>
              <label className='flex flex-row items-center '>
                Number of Kids</label>
              <input type='text'
              name="number_of_kids"
              onChange={e=> handleOnChange(e)}
              ></input>

            </div>
            <div className='py-1 flex flex-row'>
              <label className='flex flex-row items-center '>
                Gender</label>
              <input type='text'
              name='gender'
              onChange={e=> handleOnChange(e)}
              ></input>

            </div>
            <div className='py-1 flex flex-row'>
              <label className='flex flex-row items-center '>
                Colour</label>
              <input type='text' name='colour'
               onChange={e=> handleOnChange(e)}></input>

            </div>
            <div className='py-1 flex flex-row'>
              <label className='flex flex-row items-center '>
                Castrated</label>
              <input type='text' name='castrated'
               onChange={e=> handleOnChange(e)}></input>

            </div>
            <div className='py-1 flex flex-row'>
              <label className='flex flex-row items-center '>
                Health Condition</label>
              <input type='text' name="health_condition"
               onChange={e=> handleOnChange(e)}></input>

            </div>
            <div className='py-1 flex flex-row items-between'>
              <label className='flex flex-row items-center '>
                Remarks</label>
              <input type='text' name='remarks'
               onChange={e=> handleOnChange(e)}></input>

            </div>
          </DialogContentText>
        </DialogContent>
      
        <div className='w-full text-center brand-green-bg '>
          <Button onClick={submitRecord} className='w-full'>
           <span className='text-white'> ADD</span>
            </Button>
        </div>
      </Dialog>
    </div>
  );
}
