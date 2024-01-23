"use client";
import { ErrorMessage, Field, Formik, useFormik } from "formik";
import { styled } from "@stitches/react";

type TextFieldInputProps = {
  label: string;
  type: string;
  name: string;
  placeholder: string;
  onChange?: (value: any) => void;
};

const TextFieldInput = ({
  label,
  type,
  name,
  placeholder,
  onChange,
}: TextFieldInputProps) => {
  return (
    <TFormDiv
      className={`font-[400]   capitalize w-full`}>
      <label className="text-[16px]">{label}</label>
      <Field name={name}>
        {({
          field, // { name, value, onChange, onBlur }
          form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
          meta,
        } : any) => (
          <div>
            <input
              type={type}
              placeholder={placeholder}
              {...field}
              onChange={(e) => {
                field.onChange(e);
                onChange(e);
              }}
              className="form-input w-full bg-transparent border-[2px] border-[#ba8108] rounded-[32px]"
            />
        
          </div>
        )}
      </Field>
      <ErrorMessage
        className={`text-[#B4B2AF] font-[400] text-[13px] `}
        name={name}
        component="p"
      />
    </TFormDiv>
  );
};
const TFormDiv = styled("div", {
  fontSize: "1rem",
  display: "flex",
  flexDirection: "column",
  gap: "0.9375rem",
  ".form-input": {
    height: "52px",
    padding: "15px",
    fontSize: " 0.8125rem",
  },
});

export default TextFieldInput;
