"use client";
import { ButtonProps } from "@/types";
import Image from "next/image";
import React from "react";

const Button = ({ className, text, onClick, image, alt }: ButtonProps) => {
  const onClickHandler = (e: React.MouseEvent) => {
    onClick(e);
  };

  return (
    <button className={`${className}`} onClick={onClickHandler}>
      {text}
      {image !== "" && (
        <Image src={`${image}`} alt={`${alt}`} width={48} height={48} />
      )}
    </button>
  );
};

export default Button;
