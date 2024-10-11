import { useEffect, useState } from "react";
import { SearchResultCard } from "./search-result-card";
import { GetOneRecord, searchRecords } from "@/lib/api/record";
import { useQuery } from "@tanstack/react-query";

import { Button } from "./ui/button";
import CustomModal from "./ui/CustomDialog";
import { Input } from "./ui/input";
import { useAppStore } from "@/lib/store/useAppStore";

type Props=  {
  setParent : any
  name: string
  category?: string
}
export const SelectSireModal = ({setParent, name, category="any"} : Props) => {
  const [open, setOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  const { DBDetails } = useAppStore();

  const {
    isLoading: isLoadinganimal,
    error: errorAnimal,
    data: searchResults,
  } = useQuery(
    [`search-${searchInput}`],
    () => searchRecords(DBDetails?.farm_id as number, category , searchInput),
    {
      enabled: !!searchInput,
    }
  );

  useEffect(() => {}, [searchInput]);

  const displaySires = () => {
    return searchResults?.map((item, index) => {
      return (
        <Button
          type="button"
          key={index}
          className=""
          onClick={(e) => {
            e.preventDefault();
            setParent({ id: item["id"], name: item["name"] });
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
        size={"3xl"}
        trigger={
          <Button variant="outline">
            {<p className="uppercase">Select {name}</p>}
          </Button>
        }
        body={
          <div>
            <div>Select {name}</div>
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
