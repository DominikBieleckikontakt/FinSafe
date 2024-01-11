"use client";
import { ButtonProps } from "@/types";
import Image from "next/image";
import React from "react";

const Button = ({
  className,
  text,
  onClick,
  image,
  alt,
  width,
  height,
  disabled,
}: ButtonProps) => {
  const onClickHandler = (e: React.MouseEvent) => {
    onClick(e);
  };

  return (
    <button
      className={`${className}`}
      onClick={onClickHandler}
      disabled={disabled}
    >
      {image !== "" && (
        <Image
          src={`${image}`}
          alt={`${alt}`}
          width={width}
          height={height}
          className="mr-2"
        />
      )}
      {text}
    </button>
  );
};

export default Button;
