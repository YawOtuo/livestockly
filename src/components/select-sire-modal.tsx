import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import addIcon from "../icons/add.png";
import editIcon from "../icons/edit.png";
import axios from "axios";
import { SearchResultCard } from "./search-result-card";
import { url } from "../../weburl";
import { GetOneRecord, searchRecords } from "@/lib/api/record";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";

export const SelectSireModal = (props) => {
  const [open, setOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const userSqlData = useSelector((state) => state?.users?.userSqlData);


  const {
    isLoading: isLoadinganimal,
    error: errorAnimal,
    data: searchResults,
  } = useQuery([`search-${searchInput}`], () => searchRecords(userSqlData?.farm_id,  searchInput), {
    enabled: !!searchInput,
  });

  useEffect(() => {}, [searchInput]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const displaySires = () => {
    return searchResults?.map((item, index) => {
      return (
        <button
          key={index}
          className="col-span-1 border-2 border-green1  rounded-xl"
          onClick={(e) => {
            e.preventDefault();
            props.setParent({ id: item["id"], name: item["name"] });
            handleClose();
          }}>
          <SearchResultCard name={item["name"]} />
        </button>
      );
    });
  };

  const onSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  return (
    <div>
      <Button
        variant="standard"
        sx={{ color: "#0FA958" }}
        onClick={handleClickOpen}>
        {<p className="uppercase">Select {props.name}</p>}
      </Button>
      <Dialog
        open={open}
        keepMounted
        maxWidth={"md"}
        fullWidth
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description">
        <DialogTitle>Select {props.name}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <div className="justify-center items-center flex flex-col">
              <input
                type="text"
                placeholder="Search"
                onChange={(e) => onSearchInputChange(e)}
                className=" px-2 border-2 border-green1 h-[30px] rounded-2xl"
              />
              <div
                className="grid grid-cols-3 py-2 gap-5
                                w-full justify-center items-center">
                {displaySires()}
              </div>
            </div>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
};
