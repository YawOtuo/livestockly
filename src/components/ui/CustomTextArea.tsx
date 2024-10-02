import * as React from "react";
import { cn } from "@/lib/utils";
import { Label } from "./label";
import { Textarea } from "./textarea"; // Ensure you import your Textarea component
import FormErrorText from "./FormErrorText";
import { TextareaProps } from "@/components/ui/textarea"; // Adjust the path as necessary

interface CustomTextAreaProps extends TextareaProps {
  label: string;
  labelClassName?: string; // Optional prop for custom label styles
  errorText?: string;
  initialValue?: string;
}

const CustomTextArea: React.FC<CustomTextAreaProps> = ({
  label,
  labelClassName,
  errorText,
  className,
  ...props // Spread operator to capture other props
}) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      <Label
        htmlFor={props.id}
        className={cn(
          "text-sm capitalize text-black font-medium",
          labelClassName
        )}>
        {label}
      </Label>
      <Textarea className={className} {...props} />
      <FormErrorText text={errorText} />
    </div>
  );
};

export default CustomTextArea;
