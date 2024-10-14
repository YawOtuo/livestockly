import React, { useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface CustomSwitchProps {
  id: string; // Unique ID for the Switch component
  label: string; // Text for the label
  defaultChecked?: boolean; // Optional initial state
  onChange?: (checked: boolean) => void; // Handler for state change
  labelPosition?: "left" | "right"; // Optional prop for label position
}

const CustomSwitch: React.FC<CustomSwitchProps> = ({
  id,
  label,
  defaultChecked = true,
  onChange,
  labelPosition = "right",
}) => {
  const [checked, setChecked] = React.useState(defaultChecked);

  // Ensure defaultChecked updates the state when it changes
  useEffect(() => {
    setChecked(defaultChecked);
  }, [defaultChecked]);

  const handleSwitchChange = (value: boolean) => {
    setChecked(value);
    if (onChange) onChange(value);
  };

  return (
    <div
      className={`flex items-center space-x-2 ${
        labelPosition === "left" ? "flex-row-reverse" : ""
      }`}>
      <Switch id={id} checked={checked} onCheckedChange={handleSwitchChange} />
      <Label htmlFor={id}>{label}</Label>
    </div>
  );
};

export default CustomSwitch;
