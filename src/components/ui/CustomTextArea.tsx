import { Label } from "./label";
import { Textarea } from "./textarea";
import { ChangeEventHandler } from "react";

interface CustomTextAreaProps {
  label: string;
  placeholder?: string;
  id?: string;
  onChange: ChangeEventHandler<HTMLTextAreaElement>;
  helperText?: string; 
  initialValue: string
}

function CustomTextArea({
  label,
  placeholder,
  id,
  onChange,
  helperText,
}: CustomTextAreaProps) {
  return (
    <div className="flex flex-col gap-2 w-full ">
      <Label htmlFor={id} className="text-black">{label}</Label>
      <Textarea
        onChange={onChange}
        placeholder={placeholder}
        id={id}
      />
      {helperText && (
        <p className="text-sm text-muted-foreground">
          {helperText}
        </p>
      )}
    </div>
  );
}

export default CustomTextArea;
