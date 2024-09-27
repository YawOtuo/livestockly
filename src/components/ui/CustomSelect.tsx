import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";

type CustomSelectProps<T> = {
  data: T[];
  valueField: keyof T;
  labelField: keyof T;
  placeholder?: string;
  className?: string;
  onChange?: (value: string) => void;
  initialValue?: string;
  label?: string;
};

const CustomSelect = <T extends { [key: string]: any }>({
  data,
  valueField,
  labelField,
  placeholder = "Select an option",
  className,
  onChange,
  initialValue,
  label,
}: CustomSelectProps<T>) => {
  const [selectedValue, setSelectedValue] = React.useState<string | undefined>(initialValue);

  React.useEffect(() => {
    if (initialValue !== undefined) {
      setSelectedValue(initialValue)
      console.log("chaingin")
      onChange && onChange(initialValue)
    }
  }, [initialValue]);

  const handleValueChange = (value: string) => {
    setSelectedValue(value);
    onChange?.(value);
  };

  return (
    <div className="w-full flex items-center gap-3">
      {label && <p className="text-xs whitespace-nowrap">{label}</p>}
      <Select onValueChange={handleValueChange}>
        <SelectTrigger className={`${className} w-full`}>
          <p>
            {selectedValue
              ? data.find(item => item[valueField] === selectedValue)?.[labelField] ?? placeholder
              : placeholder}
          </p>
        </SelectTrigger>
        <SelectContent>
          {data.map((item, index) => (
            <SelectItem
              key={index}
              value={item[valueField] as unknown as string}
              className="!capitalize"
            >
              {item[labelField]}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default CustomSelect;
