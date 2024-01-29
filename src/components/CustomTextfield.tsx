import { TextField } from "@mui/material";

type Props = {
  label: string;
  type: string;
  name: string;
  required?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: any;
};

export const CustomTextField = ({
  label,
  type,
  name,
  onChange,
  value,
  required,
}: Props) => {
  return (
    <div className="py-2 flex flex-row text-black items-center max-w-[500px]">
      <TextField
        className="w-full"
        label={label}
        type={type}
        name={name}
        required={required}
        onChange={onChange}
        value={value}
      />
    </div>
  );
};
