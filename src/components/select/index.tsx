import React, { ElementRef, PropsWithChildren, forwardRef } from "react";
import * as RadixSelect from "@radix-ui/react-select";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@radix-ui/react-icons";

interface SelectProps {
  id: string;
  label: string;
  placeholder?: string;
  options: SelectOption[];
}

export type SelectOption = { value: string; label: string };

const Select = forwardRef<
  ElementRef<typeof RadixSelect.Root>,
  PropsWithChildren<SelectProps>
>(({ id, label, placeholder, options, ...rest }, ref) => (
  <RadixSelect.Root {...rest}>
    <RadixSelect.Trigger
      className="inline-flex h-10 items-center justify-center rounded border border-gray-300 bg-gray-50 bg-white px-2.5 text-sm leading-none text-slate-700  outline-none hover:bg-slate-100  data-[placeholder]:text-sky-500"
      aria-label={label || id}
    >
      <RadixSelect.Value placeholder={placeholder || "Select…"} />
      <RadixSelect.Icon className="ml-2 text-slate-700">
        <ChevronDownIcon />
      </RadixSelect.Icon>
    </RadixSelect.Trigger>
    <RadixSelect.Portal>
      <RadixSelect.Content className="overflow-hidden rounded-md bg-white">
        <RadixSelect.ScrollUpButton className="text-violet11 flex h-10 cursor-default items-center justify-center bg-white">
          <ChevronUpIcon />
        </RadixSelect.ScrollUpButton>
        <RadixSelect.Viewport className="p-4">
          {options.map((option) => (
            <RadixSelect.Item
              key={option.value}
              className="data-[disabled]:text-mauve8 data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1 relative flex h-[25px] select-none items-center rounded-[3px] pl-[25px] pr-[35px] text-[13px] leading-none text-slate-700 data-[disabled]:pointer-events-none data-[highlighted]:outline-none"
              value={option.value}
            >
              <RadixSelect.ItemText>{option.label}</RadixSelect.ItemText>
              <RadixSelect.ItemIndicator className="absolute left-0 inline-flex w-10 items-center justify-center">
                <CheckIcon />
              </RadixSelect.ItemIndicator>
            </RadixSelect.Item>
          ))}
        </RadixSelect.Viewport>
        <RadixSelect.ScrollDownButton className="text-violet11 cuRadixSelector-default flex h-10 items-center justify-center bg-white">
          <ChevronDownIcon />
        </RadixSelect.ScrollDownButton>
      </RadixSelect.Content>
    </RadixSelect.Portal>
  </RadixSelect.Root>
));

export default Select;
