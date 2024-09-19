import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

type Data = {
  value: string;
  label: string;
};
type Props = {
  data: Data[];
  label: string;
  onChange: any;
  initialValue? : string
};

export default function CustomSelect({ label, initialValue,  data, onChange } : Props) {
  const handleChange = (e : any) => {
    onChange((prev : any) => ({
      ...prev,
      [label]: e.target.values,
    }));
  };

  return (
    <div className="w-full">
      <FormControl sx={{ m: 1, minWidth: 80 }} className="w-full max-w-[300px]">
        <InputLabel id="demo-simple-select-autowidth-label">{label}</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={initialValue}
          onChange={handleChange}
          className="w-full"
          autoWidth
          label={label}>
          {data?.map((r, index) => (
            <MenuItem value={r?.value}>{r?.label}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
