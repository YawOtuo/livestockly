import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

type Data = {
  value: string;
  label: string;
};

type Props = {
  title: string;
  data: Data[];
  onChange: any;
  initialValue?: any;
  defaultValue? : string
};
export default function CustomRadioInput({
  initialValue,
  onChange,
  title,
  data,
  defaultValue
}: Props) {

  const handleChange = (e) => {
    // Assuming 'value' is either 'yes' or 'no'
    onChange((prev) => ({
      ...prev,
      [title]: e.target.value,
    }));
  };
  return (
    <FormControl>
      <FormLabel id="demo-radio-buttons-group-label" className="!text-black capitalize">{title}</FormLabel>
      <RadioGroup
        row
        value={initialValue}
        onChange={handleChange}
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue={defaultValue}
        name="radio-buttons-group">
        {data?.map((r, index) => (
          <FormControlLabel
            value={r?.value}
            control={<Radio />}
            label={r?.label}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
}
