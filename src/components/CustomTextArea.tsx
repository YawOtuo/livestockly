import React, { ChangeEvent } from "react";

type Props = {
  placeholder: string;
  name: string;
  classes?: string;
  onChange: any;
  value: string;
};

const CustomTextArea: React.FC<Props> = ({
  placeholder,
  name,
  classes,
  onChange,
  value,
}) => {
  return (
    <textarea
      placeholder={placeholder}
      name={name}
      className={`${classes} w-full border-2 border-green1 px-5 py-5  rounded-2xl min-h-[200px]`}
      onChange={onChange}
      value={value}
    />
  );
};

export default CustomTextArea;
