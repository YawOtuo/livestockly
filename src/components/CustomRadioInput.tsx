import React, { useEffect, useState } from "react";
import * as RadioGroup from "@radix-ui/react-radio-group";
import { InfoBubble } from "../property/details/components/InfoBubble";

type Props = {
  label: string;
  onChange: (e: any) => void;
  defaultValue?: string;
  infoBubble?: boolean;
  infoBubbleContent?: string;
};

const CustomRadioInput = ({
  label,
  onChange,
  defaultValue,
  infoBubble,
  infoBubbleContent,
}: Props) => {

  const [value, setValue] = useState<any>()
  useEffect(()=> {
    setValue(defaultValue)
  }, [])
  return (
    <form>
      <RadioGroup.Root
        onValueChange={(value) => {
          setValue(value)
          onChange(value)}}
        className="flex flex-col  gap-[0.9375rem] text-[#6A6968]"
        defaultValue="default"
        aria-label="View density">
        <div className="text-[1rem] whitespace-nowrap flex gap-2">
          {label}
          {infoBubble && <InfoBubble content={"info content"} />}
        </div>{" "}
        <div className="flex gap-5 ">
          <div className="flex items-center">
            <RadioGroup.Item
              className="bg-white w-[25px] h-[25px] rounded-full border-[1px] border-[#DDA948] shadow-blackA4 hover:bg-violet3 focus:shadow-[0_0_0_2px] focus:shadow-[#DDA948] outline-none cursor-default"
              value="yes"
              checked={value == "yes"}
              id="r1">
              <RadioGroup.Indicator className="flex items-center justify-center w-full h-full relative after:content-[''] after:block after:w-[25px] after:h-[25px] after:rounded-full after:bg-[white] after:border-[5px] after:border-[#DDA948]" />
            </RadioGroup.Item>
            <label className=" text-[15px] leading-none pl-[15px]" htmlFor="r1">
              Yes
            </label>
          </div>
          <div className="flex items-center">
            <RadioGroup.Item
              className="bg-white w-[25px] h-[25px] rounded-full border-[1px] border-[#DDA948] shadow-blackA4 hover:bg-violet3 focus:shadow-[0_0_0_2px] focus:shadow-[#DDA948] outline-none cursor-default"
              value="no"
              checked={value == "no"}
              id="r2">
              <RadioGroup.Indicator className="flex items-center justify-center w-full h-full relative after:content-[''] after:block after:w-[25px] after:h-[25px] after:rounded-full after:bg-[white] after:border-[5px] after:border-[#DDA948]" />
            </RadioGroup.Item>
            <label className=" text-[15px] leading-none pl-[15px]" htmlFor="r2">
              No
            </label>
          </div>
        </div>
      </RadioGroup.Root>
    </form>
  );
};

export default CustomRadioInput;
