import { TextField } from "@mui/material";

type Props = {
  label: string;
  type: string;
  name: string;
  required?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: any;
  multiline?: boolean;
};

export const CustomTextField = ({
  label,
  type,
  name,
  onChange,
  value,
  required,
  multiline,
}: Props) => {
  return (
    <div className="py-2 flex flex-row text-black items-center max-w-[500px]">
      <TextField
        multiline={multiline}
        rows={4}
        color="primary"
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
