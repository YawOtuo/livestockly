import * as React from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

type Props = {
  label: string;
  onChange : any
};
export default function CustomSwitch({ label, onChange }: Props) {
  const handleChange = (e : any) => {
    // Assuming 'value' is either 'yes' or 'no'
    onChange((prev : any) => ({
      ...prev,
      [label]: e.target.checked,
    }));
  };
  return (
    <FormGroup onChange={handleChange}>
      <FormControlLabel
        control={<Switch defaultChecked />}
        label={label}
        className="!capitalize"
      />
    </FormGroup>
  );
}
