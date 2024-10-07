import React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

type RadioOption = {
  label: string;
  value: string;
  id: string;
};

type CustomRadioInputProps = {
  options: RadioOption[];
  defaultValue?: string;
  onChange?: (value: string) => void;
  title?: string;
};

const CustomRadioInput: React.FC<CustomRadioInputProps> = ({
  options,
  defaultValue,
  onChange,
  title,
}) => {
  return (
    <div>
      {title && <p className="mb-2 font-semibold">{title}</p>}
      <RadioGroup
        defaultValue={defaultValue}
        onValueChange={(value) => onChange && onChange(value)}>
        {options.map((option) => (
          <div key={option.id} className="flex items-center space-x-2">
            <RadioGroupItem value={option.value} id={option.id} />
            <Label htmlFor={option.id}>{option.label}</Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default CustomRadioInput;
