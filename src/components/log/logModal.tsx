import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
} from "@mui/material";
import { styled } from "@stitches/react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useSearchParams } from "next/navigation";
import { AiOutlineEdit } from "react-icons/ai";
import { BiSolidBookAdd } from "react-icons/bi";
import { CustomTextField } from "../CustomTextfield";
import { Form, Formik } from "formik";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const LogModal = (props) => {
  const [open, setOpen] = React.useState(false);
  const params = useSearchParams();
  const dispatch = useDispatch();

  const [dataInput, setDataInput] = useState([]);

  const [record, setRecord] = useState([]);

  useEffect(() => {
    if (props.edit) {
      switch (props.label) {
        case "weight":
          setDataInput(props.data);
          break;
        case "health_condition":
          setDataInput(props.data);
          break;
        case "vaccination_info":
          setDataInput(props.data);
          break;
        case "remarks":
          setDataInput(props.data);
          break;
        default:
          break;
      }
    }
  }, [props.edit]);

  const handleOnChange = (e) => {
    let value = e.target.value;
    let name = e.target.name;
    setDataInput({ ...dataInput, [name]: value });
  };

  const handleUpdate = async () => {
    // !props.edit ? updateRecordJSON(params.id, [dataInput], props.label) :
    // updateRecordJSONOne(params.id, [dataInput], props.label, props.index)
    // handleClose()
    // dispatch(refresh())
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
        {props.icon == "edit" && <AiOutlineEdit color="" size={20} />}
        {props.icon == "add" && <BiSolidBookAdd color="#0FA958" size={30} />}
      </button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        maxWidth={"sm"}
        fullWidth
        aria-describedby="alert-dialog-slide-description">
        <DialogTitle className="shadow-md uppercase brand-green-font">
          {props?.edit ? `EDIT ${props?.type}` : `ADD ${props?.type}`}
        </DialogTitle>
        <DialogContent>
          <Formik onSubmit={(values) => {}}>
            {({ handleSubmit, handleBlur, values, errors, handleChange }) => (
              <Form>
                <DialogContentText
                  id="alert-dialog-slide-description"
                  className="pt-4 text-black">
                  <div className="flex flex-col gap-2 lg:gap-6">
                    <CustomTextField
                      label={"date"}
                      type="date"
                      name="date"
                      required
                      onChange={handleOnChange}
                      value={dataInput && dataInput["date"]}
                    />
                  </div>

                  <div className="flex flex-col  gap-3 xl:gap-6">
                    <textarea
                      className="border-2 p-2 rounded-md"
                      placeholder={props.type}
                      minRows={4}
                      name={"content"}
                      onChange={handleOnChange}
                      value={dataInput && dataInput["content"]}
                    />
                  </div>
                </DialogContentText>
              </Form>
            )}
          </Formik>
        </DialogContent>

        <div className="w-full text-center brand-green-bg ">
          <Button onClick={() => handleUpdate()} className="!bg-green1 w-full">
            <span className="text-white font-semibold">
              {props?.edit ? "EDIT" : "ADD"}
            </span>
          </Button>
        </div>
      </Dialog>
    </Root>
  );
};

const Root = styled("div", {});

export default LogModal;
