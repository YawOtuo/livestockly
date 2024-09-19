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
import { useParams, useSearchParams } from "next/navigation";
import { AiOutlineEdit } from "react-icons/ai";
import { BiSolidBookAdd } from "react-icons/bi";
import { CustomTextField } from "../CustomTextfield";
import { Form, Formik } from "formik";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  AddRecordBody,
  RecordJsonOne,
  updateRecordJSON,
  updateRecordJSONOne,
} from "@/lib/api/record";
import { today } from "@/lib/utils/date";

// const Transition = React.forwardRef(function Transition(props, ref) {
//   return <Slide direction="up" ref={ref} {...props} />;
// });

type Props = {
  label: string;
  data?: any;
  icon: any;
  edit?: boolean;
  type: string;
  index?: number;
};

const LogModal = ({ label, data, icon, edit, type, index }: Props) => {
  const [open, setOpen] = React.useState(false);
  const params = useParams();
  const dispatch = useDispatch();

  const [dataInput, setDataInput] = useState([]);

  const [record, setRecord] = useState([]);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (edit) {
      switch (label) {
        case "weight":
          setDataInput(data);
          break;
        case "health_condition":
          setDataInput(data);
          break;
        case "vaccination_info":
          setDataInput(data);
          break;
        case "remarks":
          setDataInput(data);
          break;
        default:
          break;
      }
    }
  }, [edit]);

  const addMutation = useMutation(
    (data: RecordJsonOne) => updateRecordJSON(Number(params?.id), data, label),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([`records-${params?.id}`]);
      },
    }
  );

  const updateMutation = useMutation(
    (data: RecordJsonOne) =>
      updateRecordJSONOne(Number(params?.id), data, label, index as number),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([`records-${params?.id}`]);
      },
    }
  );

  const handleAdd = async (newItem: AddRecordBody) => {
    handleClose();

    addMutation.mutate(newItem);
  };

  const handleUpdate = async (newItem: AddRecordBody) => {
    handleClose();

    updateMutation.mutate(newItem);
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
        {icon == "edit" && <AiOutlineEdit color="" size={20} />}
        {icon == "add" && <BiSolidBookAdd color="#0FA958" size={30} />}
      </button>
      <Dialog
        open={open}
        // TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        maxWidth={"sm"}
        fullWidth
        aria-describedby="alert-dialog-slide-description">
        <DialogTitle className="shadow-md uppercase brand-green-font">
          {edit ? `EDIT ${type}` : `ADD ${type}`}
        </DialogTitle>
        <DialogContent>
          <Formik
            initialValues={{
              date: data?.date || today,
              content: data?.content,
            }}
            onSubmit={(values) => {}}>
            {({ handleSubmit, handleBlur, values, errors, handleChange }) => (
              <Form>
                <DialogContentText
                  id="alert-dialog-slide-description"
                  className="pt-4 text-black">
                  <div className="flex flex-col gap-2 lg:gap-6">
                    <CustomTextField
                      label="date"
                      type="date"
                      name="date"
                      required
                      onChange={handleChange}
                      value={values?.date}
                    />
                  </div>

                  <div className="flex flex-col  gap-3 xl:gap-6">
                    <textarea
                      className="border-2 p-2 rounded-md"
                      placeholder={type}
                      required
                      name={"content"}
                      onChange={handleChange}
                      value={values?.content}
                    />
                  </div>
                </DialogContentText>

                <div className="w-full text-center brand-green-bg mt-3">
                  <Button type="submit" className="!bg-green1 w-full">
                    <span className="text-white font-semibold">
                      {edit ? "EDIT" : "ADD"}
                    </span>
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
    </Root>
  );
};

const Root = styled("div", {});

export default LogModal;
