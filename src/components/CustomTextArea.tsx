import { TextField } from "@mui/material";
import React, { ChangeEvent } from "react";

type Props = {
  placeholder: string;
  name: string;
  classes?: string;
  onChange: any;
  value: string;
  label: string;
};

const CustomTextArea: React.FC<Props> = ({
  placeholder,
  name,
  classes,
  onChange,
  value,
  label,
}) => {
  return (
    <div className="py-2 flex flex-row text-black items-center max-w-[500px]">
      {/* <TextField
        color="primary"
        className="w-full"
        label={label}
        multiline
        type={type}
        name={name}
        required={required}
        onChange={onChange}
        value={value}
      /> */}
    </div>
  );
};

export default CustomTextArea;
