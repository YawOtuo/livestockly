"use client";
import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import axios from "axios";
import { SelectSireModal } from "./select-sire-modal";
import { useSelector, useDispatch } from "react-redux";
import { url } from "../../weburl";
import { addMessage } from "@/lib/redux/reducers/messages";
import { LoadingModal } from "./loading-modal";
import { CustomTextField } from "./CustomTextfield";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AddRecord, GetOneRecord, updateRecord } from "@/lib/api/record";
import CustomTextArea from "./CustomTextArea";
import { Form, Formik } from "formik";
import CustomRadioInput from "./CustomRadioInput";
const addIcon = "/icons/add.png";
const editIcon = "/icons/edit.png";

const Transition: any = React.forwardRef(function Transition(props, ref) {
  return <Slide children={undefined} direction="up" ref={ref} {...props} />;
});

type Props = {
  edit?: boolean;
  record?: any;
  type?: string;
  title?: string;
};
export default function AddRecordModal({ edit, record, type, title }: Props) {
  const [open, setOpen] = React.useState(false);
  const userSqlData = useSelector((state) => state?.users?.userSqlData);
  const [sire, setSire] = useState();
  const [dam, setDam] = useState();
  const [otherData, setOtherData] = useState([]);


  const {
    isLoading: isLoadingSire,
    error: errorSire,
    data: sire_,
  } = useQuery(
    [`${record?.type}-${record?.sire}`],
    () => GetOneRecord(record?.sire),
    {
      enabled: !!record?.sire,
    }
  );
  const {
    isLoading: isLoadingDam,
    error: errorDam,
    data: dam_,
  } = useQuery(
    [`${record?.slug}-${record?.dam}`],
    () => GetOneRecord(record?.dam),
    {
      enabled: !!record?.sire,
    }
  );

  useEffect(() => {
    if (sire_) {
      setSire(sire_);
    }
    if (dam_) {
      setDam(dam_);
    }
  }, [sire_, dam_]);

  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const createMutation = useMutation((newItem) => AddRecord(newItem), {
    onSuccess: () => {
      queryClient.invalidateQueries(`records`);
    },
  });
  const updateMutation = useMutation(
    (newItem) => updateRecord(record?.id, newItem),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(`records-${record?.id}`);
      },
    }
  );

  const handleCreate = async (data) => {
    createMutation.mutate(data);
    setOpen(false);
  };

  const handleUpdate = async (data) => {
    updateMutation.mutate(data);
    setOpen(false);
  };
  return (
    <div>
      <Button variant="text" className="!text-green1 !capitalize" onClick={handleClickOpen}>
        {edit ? (
          <img src={editIcon} width="90%" />
        ) : (
          <div className="flex gap-1 items-center">
            <img src={addIcon} width="40px" />
            <p className="whitespace-nowrap">{title}</p>{" "}
          </div>
        )}
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        maxWidth={"lg"}
        fullWidth
        aria-describedby="alert-dialog-slide-description">
        <DialogTitle className="shadow-md ">
          {edit ? "EDIT RECORD" : `NEW RECORD (${type})`}
        </DialogTitle>
        <DialogContent>
          <Formik
            initialValues={{
             ...record
            }}
            onSubmit={(values) => {
              console.log("submitting");
              !edit ? handleCreate(values) : handleUpdate(values);
            }}>
            <Form>
              <DialogContentText
                id="alert-dialog-slide-description"
                className="pt-4 text-black grid grid-cols-2">
                <div className="col-span-2 lg:col-span-1 flex flex-col gap-2 lg:gap-6">
                  <CustomTextField label={"tag name"} type="text" name="name" />

                  <CustomTextField
                    label={"tag colour"}
                    type="text"
                    name="tag_colour"
                  />

                  <CustomTextField label={"colour"} name="colour" type="text" />

                  <CustomTextField
                    label={"health condition"}
                    name="health_condition"
                    type="text"
                  />

                  <CustomTextField
                    label={"number of kids"}
                    name="number_of_kids"
                    type="number"
                  />

                  <CustomTextField
                    label={"weight"}
                    name="weight"
                    type="number"
                  />

                  <CustomTextField
                    label={"date of birth"}
                    name="date_of_birth"
                    type="text"
                  />
                </div>
                <div className="flex flex-col col-span-2 lg:col-span-1 gap-3 xl:gap-6">
                  <div className="flex flex-row text-black">
                    <div>
                      Sire: {sire?.name}
                      <SelectSireModal
                        setParent={setSire}
                        type={type}
                        name="sire"
                      />
                    </div>

                    <div>
                      Dam: {dam?.name}
                      <SelectSireModal
                        setParent={setDam}
                        type={type}
                        name="dam"
                      />
                    </div>
                  </div>

                  {/* <div className="text-black flex flex-row py-1">
                    <div className="">Gender</div>
                    <div className="mx-3 flex flex-row gap-2">
                      <CustomRadioInput
                        id="html"
                        name="gender"
                        value="male"
                        onChange={() => setOtherData([])}
                      />
                      <label htmlFor="html">male</label>
                
                      <label htmlFor="css">female</label>
                    </div>
                  </div> */}

                  {/* <div className="text-black flex flex-row py-1">
                    <div className="">Castrated</div>
                    <div className="mx-3 flex flex-row gap-2">
                      <input
                        id="html"
                        name="castrated"
                        value="yes"
                        onChange={handleOnChange}
                      />
                      <label htmlFor="html">yes</label>
                
                      <label htmlFor="css">no</label>
                    </div>
                  </div> */}
                  <div className="mb-5">
                    {" "}
                    <CustomTextArea
                      placeholder="Vaccination Info"
                      name="vaccination_info"
                      onChange={(e) =>
                        setOtherData((prev) => [...prev, e.target.value])
                      }
                      value={record?.vaccination_info?.content}
                    />
                  </div>

                  <CustomTextArea
                    placeholder="Remarks"
                    name="remarks"
                    onChange={(e) =>
                      setOtherData((prev) => [...prev, e.target.value])
                    }
                    value={record?.remarks?.content}
                  />

                  {/* <input type="file" /> */}
                </div>
              </DialogContentText>
              <div className="w-full text-center mt-5 rounded-lg bg-green1 ">
                <Button type="submit" className="w-full">
                  <span className="text-white">{edit ? "EDIT" : "ADD"}</span>
                </Button>
              </div>
            </Form>
          </Formik>
        </DialogContent>
      </Dialog>
    </div>
  );
}
