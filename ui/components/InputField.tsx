import React from "react";
import classNames from "classnames";
// import { InputIcon } from "../Icon/InputIcon/InputIcon";

export type ValidationResult = {
  // true == error, false == pass, none == just typing or nothing
  isInvalid: boolean | "none";
  errorMessage?: string;
};

export type InputFieldProps = {
  label?: string;
  placeholder?: string;
  giveWidthFull?: boolean;
  type: "email" | "password" | "number" | "text";
  name: string;
  isThin?: boolean;
  isAutocomplete?: boolean;
  isInvalid: boolean | "none";
  value?: any;
  min?: number;
  max?: number;
  step?: number;
  validationErrorMsg?: string;
  onChange(value: string): void;
};

const error = (
  <div className="w-5 h-5 relative bottom-12.8 inline-block float-right mr-4">
    <div
      className="z-10 relative"
      style={{
        filter: `invert(45%) sepia(79%) saturate(2978%) hue-rotate(333deg) brightness(105%) contrast(96%)`,
        width: `100%`,
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        // height="24px"
        // viewBox="0 0 24 24"
        // width="24px"
        fill="#000000"
      >
        <path d="M0 0h24v24H0z" fill="none" />
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
      </svg>
    </div>
  </div>
);

const pass = (
  <div className="w-5 h-5 relative bottom-12.8 inline-block float-right mr-4">
    <div
      className="z-10 relative"
      style={{
        filter: `invert(50%) sepia(80%) saturate(1148%) hue-rotate(126deg) brightness(103%) contrast(89%)`,
        width: `100%`,
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        // height="24px"
        // viewBox="0 0 24 24"
        // width="24px"
        fill="#000000"
      >
        <path d="M0 0h24v24H0z" fill="none" />
        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
      </svg>
    </div>
  </div>
);

const none = (
  <div className="w-5 h-5 relative bottom-13.2 inline-block float-right mr-4"></div>
);

export function InputField({
  label,
  type = "text",
  name,
  isInvalid = "none",
  isThin = false,
  validationErrorMsg,
  giveWidthFull,
  isAutocomplete = true,
  placeholder,
  value,
  min = undefined,
  max = undefined,
  step = undefined,
  onChange,
}: InputFieldProps) {
  let validationDiv = none;
  if (isInvalid === "none") {
    validationDiv = none;
  } else if (isInvalid) {
    validationDiv = error;
  } else if (!isInvalid) {
    validationDiv = pass;
  }
  let validationErrDiv = <div className="h-3.5"></div>;
  if (isInvalid && validationErrorMsg) {
    validationErrDiv = (
      <div
        className={classNames("z-0 w-full relative leading-3 text-xs", {
          "h-3.5 text-red-500 not-italic": validationErrorMsg !== "",
          "h-3.5 ": validationErrorMsg == "",
        })}
      >
        {validationErrorMsg}
      </div>
    );
  }

  return (
    <>
      {type === "number" ? (
        <style>
          {`
            input[type=number]::-webkit-inner-spin-button,
            input[type=number]::-webkit-outer-spin-button {
              -webkit-appearance: none;
              margin: 0;
            }`}
        </style>
      ) : (
        ""
      )}
      <div
        className={classNames({
          "w-full h-19.25": giveWidthFull,
          "w-75 h-19.25": !giveWidthFull,
        })}
      >
        <div
          className={classNames("relative mb-2", {
            "text-15px text-bookshop_gray-7": isThin,
            "": !isThin,
          })}
        >
          {label}
        </div>
        <div>
          <input
            className={classNames(
              "z-10 w-full h-12 relative pl-4 bottom-0.8 placeholder-bookshop_gray-4 box-border border-solid focus:border-bookshop_purple-4",
              {
                "border-2 rounded-sm": !isThin,
                "border rounded-2px placeholder-bookshop_gray-4 placeholder-text-base":
                  isThin,

                "border-bookshop_gray-3": !isInvalid || isInvalid === "none",
                "border-red-500": isInvalid,
              }
            )}
            autoComplete={isAutocomplete ? "on" : "off"}
            type={type}
            name={name}
            placeholder={placeholder}
            min={min}
            max={max}
            value={value}
            step={step}
            onChange={(ev) => {
              onChange(ev.target.value);
            }}
            style={{
              transition: ".2s",
              WebkitTransition: ".2s",
            }}
          />
          {validationErrDiv}
          {validationDiv}
        </div>
      </div>
    </>
  );
}
