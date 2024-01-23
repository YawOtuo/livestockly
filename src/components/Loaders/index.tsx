import { green } from "@mui/material/colors";
import { SyncLoader } from "react-spinners";

type Props = {
  variant: "syncloader";
  colour: "green1";
};

const colors : any = {
  green1: "#0FA958",
};

export const CustomLoaders = ({ variant, colour }: Props) => {
  const loaders: any = {
    syncloader: <SyncLoader color={colors[colour]} />,
  };

  return <div>{loaders[variant]}</div>;
};
