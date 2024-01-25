import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ChangeUserPermission } from "@/lib/api/users";
import { useSelector } from "react-redux";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const options: any = {
  "1": "Can create records",
  "2": "Can also edit and delete rejects",
  "3": "Can also accept, reject and promote Workers",
};
const PermissionOption = ({
  number,
  worker,
}: {
  number: string | number;
  worker: any;
}) => {
  const queryClient = useQueryClient();
  const userSqlData = useSelector((state) => state?.users?.userSqlData);

  const changePermissionMutation = useMutation(
    (data) => ChangeUserPermission(userSqlData?.farm_id, data?.id, data?.level),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(`workers`);
      },
    }
  );

  const handlePermission = async (newItem) => {
    changePermissionMutation.mutate(newItem);
  };
  return (
    <div className="flex items-center gap-5 hover:bg-green2 cursor-pointer">
      <div className="border-green1 border-2 rounded-full text-green1 w-[50px] aspect-square flex items-center justify-center text-2xl font-semibold">
        {number}
      </div>
      {options[number]}
      {worker?.permission == String(number) && (
        <p className="uppercase text-xs rounded-md font-semibold border-2 border-yellow-600 px-2 py-1">
          Current
        </p>
      )}
      <Button
        className="!text-green1 !font-semibold"
        onClick={() => handlePermission({ id: worker?.id, level: number })}>
        Select
      </Button>
    </div>
  );
};

type Props = {
  worker: any;
};
export default function PermissionDialog({ worker }: Props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button
        onClick={handleClickOpen}
        className="!text-gray-900 !font-semibold
            ">
        Change Permission
      </Button>

      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description">
        <DialogTitle>{"Change Permission"}</DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-slide-description"
            className="flex flex-col gap-5">
            {Object.keys(options).map((r, index) => (
              <PermissionOption number={index + 1} worker={worker} />
            ))}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
