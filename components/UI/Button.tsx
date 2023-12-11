"use client";
import { ButtonProps } from "@/types";
import React from "react";

const Button = ({ className, text, onClick }: ButtonProps) => {
  const onClickHandler = (e: React.MouseEvent) => {
    onClick(e);
  };

  return (
    <button className={`${className}`} onClick={onClickHandler}>
      {text}
    </button>
  );
};

export default Button;
