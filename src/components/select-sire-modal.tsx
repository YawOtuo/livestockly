import { useEffect, useState } from "react";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import { SearchResultCard } from "./search-result-card";
import { url } from "../../weburl";
import { GetOneRecord, searchRecords } from "@/lib/api/record";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";
import { Button } from "./ui/button";
import CustomModal from "./ui/CustomDialog";
import { Input } from "./ui/input";

export const SelectSireModal = (props: any) => {
  const [open, setOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const userSqlData = useSelector(
    (state: RootState) => state?.users?.userSqlData
  );

  const {
    isLoading: isLoadinganimal,
    error: errorAnimal,
    data: searchResults,
  } = useQuery(
    [`search-${searchInput}`],
    () => searchRecords(userSqlData?.farm_id as number, searchInput),
    {
      enabled: !!searchInput,
    }
  );

  useEffect(() => {}, [searchInput]);


  const displaySires = () => {
    return searchResults?.map((item, index) => {
      return (
        <Button
          key={index}
          className=""
          onClick={(e) => {
            e.preventDefault();
            props.setParent({ id: item["id"], name: item["name"] });
            setOpen(false);
          }}>
          <SearchResultCard name={item["name"]} />
        </Button>
      );
    });
  };

  const onSearchInputChange = (e: any) => {
    setSearchInput(e.target.value);
  };

  return (
    <div>
      <CustomModal
        open={open}
        onOpenChange={setOpen}
        size={"4xl"}
        trigger={
          <Button variant="outline" >
            {<p className="uppercase">Select {props.name}</p>}
          </Button>
        }
        body={
          <div>
            <div>Select {props.name}</div>
            <div>
              <div>
                <div className="justify-center items-center flex flex-col">
                  <Input
                    type="text"
                    placeholder="Search"
                    onChange={(e) => onSearchInputChange(e)}
                    className=" px-2  h-[30px] rounded-2xl"
                  />
                  <div
                    className="grid grid-cols-3 py-2 gap-5
                                    w-full justify-center items-center">
                    {displaySires()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        }
      />
    </div>
  );
};
