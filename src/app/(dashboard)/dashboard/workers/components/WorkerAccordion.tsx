import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
import { IoIosContact } from "react-icons/io";
import { AcceptUser, DeAcceptUser } from "@/lib/api/users";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import PermissionDialog from "./PermissionDialog";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";

type Props = {
  worker: any;
  accepted?: boolean;
};

export default function WorkerAccordion({ worker, accepted = false }: Props) {
  const queryClient = useQueryClient();
  const userSqlData = useSelector(
    (state: RootState) => state?.users?.userSqlData
  );

  const acceptMutation = useMutation((id: number) => AcceptUser(id), {
    onSuccess: () => {
      queryClient.invalidateQueries([`workers`, "workers-unaccepted"]);
    },
  });

  const handleAccept = async (newItem: number) => {
    acceptMutation.mutate(newItem);
  };

  const rejectMutation = useMutation((id: number) => DeAcceptUser(id), {
    onSuccess: () => {
      queryClient.invalidateQueries([`workers`, "workers-unaccepted"]);
    },
  });

  const handleReject = async (newItem: number) => {
    rejectMutation.mutate(newItem);
  };

  return (
    <div className="w-full max-w-[400px]">
      <Accordion className="">
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header">
          <div className="flex items-center rounded-md min-w-[300px] cursor-pointer justify-start gap-5 px-10 py-5 ">
            <div className="flex gap-5 items-center justify-center">
              <IoIosContact size={50} color="grey" />
              <div className="flex flex-col gap-1">
                <p className="font-semibold">
                  {worker?.username}
                  {worker?.id == userSqlData?.id && (
                    <span className=""> (me)</span>
                  )}
                </p>
                <p className="text-xs">{worker?.email}</p>
              </div>
            </div>
          </div>{" "}
        </AccordionSummary>
        {accepted && (
          <AccordionDetails className="flex flex-col gap-1 items-start">
            <Button
              className="!text-red-400 !font-semibold"
              onClick={() => handleReject(worker?.id)}>
              Remove
            </Button>
            {worker?.id !== userSqlData?.id && (
              <PermissionDialog worker={worker} />
            )}{" "}
          </AccordionDetails>
        )}
        {!accepted && (
          <AccordionDetails className="flex  gap-1 items-start">
            <Button
              className="!text-green1 !font-semibold"
              onClick={() => handleAccept(worker?.id)}>
              Accept
            </Button>
            {/* <Button
              className="!text-red-600 !font-semibold"
              onClick={() => handleReject(worker?.id)}>
              Reject
            </Button> */}
          </AccordionDetails>
        )}
      </Accordion>
    </div>
  );
}
