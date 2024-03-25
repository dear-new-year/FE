import React from "react";
import { InputHTMLAttributes, forwardRef } from "react";
import { classNames } from "../../utils/classNames";
import Image from "next/image";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

interface BorderRadioButtonProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  isChecked: boolean;
  className?: string;
  name: string;
  value: string;
  icons?: StaticImport;
}
// eslint-disable-next-line react/display-name
const BorderRadioButton = forwardRef<HTMLInputElement, BorderRadioButtonProps>(
  ({ label, isChecked, id, className, name, value, icons, ...props }, ref) => {
    return (
      <>
        <label
          htmlFor={id}
          className={classNames(
            "relative rounded-full h-10 w-10 border-1 cursor-pointer",

            isChecked && "border border-black "
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
            />
            {icons && (
              <Image
                src={icons}
                alt={label}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              />
            )}
          </div>
        </label>
      </>
    );
  }
);

export default BorderRadioButton;
