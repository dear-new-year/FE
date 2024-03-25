import React from "react";
import { InputHTMLAttributes, forwardRef } from "react";
import { classNames } from "../../utils/classNames";
import Image from "next/image";
import selected from "../../assets/icons/selected.svg";

interface RoundRadioButtonProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  isChecked: boolean;
  className: string;
  name: string;
  value: string;
}
// eslint-disable-next-line react/display-name
const RoundRadioButton = forwardRef<HTMLInputElement, RoundRadioButtonProps>(
  ({ label, isChecked, id, className, name, value, ...props }, ref) => {
    return (
      <>
        <label
          htmlFor={id}
          className={classNames(
            "relative rounded-full h-10 w-10 border-1 cursor-pointer",
            className,
            isChecked && "border border-black"
          )}
        >
          <div className="flex items-center">
            <input
              id={id}
              value={value}
              name={name}
              type="radio"
              {...props}
              ref={ref}
              required
              className="hidden"
            ></input>
            {isChecked && (
              <Image
                src={selected}
                alt="selected"
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10"
              />
            )}
          </div>
        </label>
      </>
    );
  }
);

export default RoundRadioButton;
