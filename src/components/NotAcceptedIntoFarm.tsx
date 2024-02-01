import { Button } from "@mui/material";

function NotAcceptedIntoFarm() {
  return (
    <div className="flex flex-col gap-5 min-h-[80vh] items-center justify-center border-2 bg-green2 px-5">
      <p className="text-2xl font-semibold text-green1">
        Oops!!! It seems you have not yet been accepted into this farm
      </p>
      <div className="flex flex-col">
        <p>A notification has been sent to the manager to accept you</p>

        <Button className=" !text-black !font-semibold">Resend Notification</Button>
     
      </div>
    </div>
  );
}

export default NotAcceptedIntoFarm;
