import * as React from "react";
import { cn } from "@/lib/utils";
import { Input, InputProps } from "@/components/ui/input"; // Adjust the path as necessary
import FormErrorText from "./FormErrorText";

interface CustomInputProps extends InputProps {
  label: string; // Add label prop for the CustomInput component
  labelClassName?: string; // Optional prop for custom label styles
  defaultValue?: string;
  errorText?: string;
}

const CustomInput = React.forwardRef<HTMLInputElement, CustomInputProps>(
  ({ label, labelClassName, errorText,  className, type, defaultValue, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-2 w-full">
        {/* Label */}
        <label
          className={cn(
            "text-sm capitalize text-black font-medium",
            labelClassName
          )}>
          {label}
        </label>
        {/* Input Field */}
        <Input
          type={type}
          className={className}
          defaultValue={defaultValue}
          ref={ref}
          {...props}
          autoFocus={false}
        />

        <FormErrorText text={errorText} />
      </div>
    );
  }
);

CustomInput.displayName = "CustomInput";

export default CustomInput;
