"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

// Generic reusable combobox component
interface ComboboxProps<T> {
  items: T[];
  label: string;
  placeholder?: string;
  value: string;
  onSelect: (value: string) => void;
  displayKey?: keyof T;
}

export function CustomCombobox<T>({
  items,
  label,
  placeholder = "Select item...",
  value,
  onSelect,
  displayKey = "label" as keyof T,
}: ComboboxProps<T>) {
  const [open, setOpen] = React.useState(false);

  const getDisplayLabel = (item: T): string => {
    return item[displayKey] as unknown as string;
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between">
          {value
            ? getDisplayLabel(
                items.find((item) => (item as any).value === value)!
              )
            : label}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0 z-[6000]">
        <Command >
          <CommandInput placeholder={placeholder} />
          <CommandList>
            <CommandEmpty>No items found.</CommandEmpty>
            <CommandGroup className="z-[7000]">
              {items.map((item) => {
                // console.log("Item:", item); // Log each item to inspect the structure
                return (
                  <CommandItem
                  className="z-[700] hover:bg-primary"
                    key={(item as any).value}
                    value={(item as any).value}
                    onSelect={(currentValue) => {
              
                      onSelect(currentValue === value ? value : currentValue);
                      setOpen(false);
                    }}>
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === (item as any).value
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                    {getDisplayLabel(item)}
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
