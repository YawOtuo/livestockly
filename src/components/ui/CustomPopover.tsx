import { ReactNode } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

interface CustomPopoverProps {
  trigger: ReactNode;
  content: ReactNode;
  contentClassName? : string
}

function CustomPopover({ trigger, content, contentClassName }: CustomPopoverProps) {
  return (
    <Popover>
      <PopoverTrigger>{trigger}</PopoverTrigger>
      <PopoverContent className={contentClassName}>{content}</PopoverContent>
    </Popover>
  );
}

export default CustomPopover;
