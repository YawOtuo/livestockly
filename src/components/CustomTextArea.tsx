import React, { ChangeEvent } from "react";

type Props = {
  placeholder: string;
  name: string;
  classes?: string;
  onChange: any;
  value: string;
  label: string
};

const CustomTextArea: React.FC<Props> = ({
  placeholder,
  name,
  classes,
  onChange,
  value,
  label
}) => {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="" className="capitalize text-black">{label}</label>
      <textarea
        placeholder={placeholder}
        name={name}
        className={`${classes} w-full border-2 border-green1 px-5 py-5  rounded-2xl min-h-[200px]`}
        onChange={onChange}
        value={value}
      />
    </div>
  );
};

export default CustomTextArea;
