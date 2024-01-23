import { Typography } from "@mui/material";
import { Field } from "formik";

export const CustomTextField = (props) => {
  return (
    <div className="py-2 flex flex-row text-black items-center max-w-[500px] ">
      <Typography className="flex flex-row whitespace-nowrap items-center capitalize ">
        {props.label}
      </Typography>
      <Field
        type={props.type}
        name={props.name}
        className="w-full rounded-2xl h-[30px] border-2 border-green1   mx-3 px-3 record-form-input"/>
    </div>
  );
};
