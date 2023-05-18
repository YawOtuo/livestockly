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


const Transition = React.forwardRef(function Transition(
  props,
  ref
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide() {
  const [open, setOpen] = React.useState(false);

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
                <img src={nestTag} width={"10%"} className='mr-2'/>
                Enter name</label>
              <input type='text'></input>

            </div>
            <div className='py-1 flex flex-row'>
              <label className='flex flex-row items-center '>
                <img src={nestTag} width={"10%"} className='mr-2'/>
                Enter name</label>
              <input type='text'></input>

            </div>
            <div className='py-1 flex flex-row'>
              <label className='flex flex-row items-center '>
                <img src={nestTag} width={"10%"} className='mr-2'/>
                Enter name</label>
              <input type='text'></input>

            </div>
            <div className='py-1 flex flex-row'>
              <label className='flex flex-row items-center '>
                <img src={nestTag} width={"10%"} className='mr-2'/>
                Enter name</label>
              <input type='text'></input>

            </div>
            <div className='py-1 flex flex-row'>
              <label className='flex flex-row items-center '>
                <img src={nestTag} width={"10%"} className='mr-2'/>
                Enter name</label>
              <input type='text'></input>

            </div>
          </DialogContentText>
        </DialogContent>
      
        <div className='w-full text-center brand-green-bg '>
          <Button onClick={handleClose} className=''>
           <span className='text-white'> ADD</span>
            </Button>
        </div>
      </Dialog>
    </div>
  );
}
