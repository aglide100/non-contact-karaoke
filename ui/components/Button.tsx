import React, { ReactNode } from "react";
import classNames from "classnames";

type ButtonProps = {
  size: "small" | "medium" | "large" | "full";
  type?: "submit" | "button";
  color?: "purple" | "gray" | "white";
  isDisabled?: boolean;
  transition?: ".4s" | ".2s";
  onClick: (e) => void;
  children: ReactNode;
};

export const Button = ({
  onClick,
  type = "button",
  color = "purple",
  isDisabled = false,
  transition = ".2s",
  size = "medium",
  children,
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={classNames("border rounded border-solid", {
        "w-11.5 h-7.5 text-xs": size === "small",
        "w-16.75 h-9.5 text-sm": size === "medium",
        "w-50 h-12.5 text-lg": size === "large",
        "w-full h-full": size === "full",

        "bg-bookshop_purple-2 text-white border-bookshop_purple-2":
          color === "purple" && isDisabled,
        "bg-bookshop_purple-4 text-white border-bookshop_purple-4":
          color === "purple" && !isDisabled,
        "bg-bookshop_gray-2 text-white border-bookshop_gray-2":
          color === "gray" && isDisabled,
        "border-bookshop_gray-5 bg-bookshop_gray-5 text-white":
          color === "gray" && !isDisabled,
        "border-bookshop_gray-2 bg-white text-bookshop_gray-7`":
          color === "white",

        "hover:bg-bookshop_purple-5 hover:text-white hover:border-bookshop_purple-5":
          color === "purple" && !isDisabled,
        "hover:bg-bookshop_gray-6 hover:text-white hover:border-bookshop_gray-6":
          color === "gray" && !isDisabled,
        "hover:bg-bookshop_gray-1 hover:text-bookshop_gray-7 hover:border-bookshop_gray-2":
          color === "white" && !isDisabled,

        "text-opacity-30": isDisabled,
      })}
      style={{ transition: transition, WebkitTransition: transition }}
      disabled={isDisabled}
      onClick={(ev) => {
        ev.preventDefault();
        onClick(ev);
      }}
    >
      {children}
    </button>
  );
};
