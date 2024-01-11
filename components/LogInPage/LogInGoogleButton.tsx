"use client";
import React from "react";
import { signIn } from "next-auth/react";

import { LogInGoogleButtonProps } from "@/types";
import { Button } from "..";

const LogInGoogleButton = ({ disabled }: LogInGoogleButtonProps) => {
  const loginHandler = () =>
    signIn("google", {
      callbackUrl: "/home",
      redirect: true,
    });

  return (
    <Button
      text="Log in with Google"
      image="/icons/google.svg"
      alt="google icon"
      onClick={loginHandler}
      className="p-3 mx-5 text-center rounded-lg flex text-white text-lg items-center w-full bg-[#222222] hover:bg-[#446eb1] duration-300"
      width={24}
      height={24}
      disabled={disabled}
    />
  );
};

export default LogInGoogleButton;
