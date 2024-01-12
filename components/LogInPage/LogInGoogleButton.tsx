"use client";
import React, { useState } from "react";
import { signIn } from "next-auth/react";

import { LogInGoogleButtonProps } from "@/types";
import { Button } from "..";

const LogInGoogleButton = ({ disabled }: LogInGoogleButtonProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const loginHandler = async () => {
    setIsLoading(true);
    try {
      signIn("google", {
        callbackUrl: "/home",
        redirect: true,
      });
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  };
  return (
    <>
      {isLoading && (
        <Button
          text=""
          image=""
          alt=""
          onClick={loginHandler}
          className="p-3 mx-5 text-center rounded-lg flex text-white text-lg items-center w-full bg-[#222222] hover:bg-[#446eb1] duration-300 justify-center"
          width={0}
          height={0}
          disabled={true}
          loader={true}
        />
      )}
      {!isLoading && (
        <Button
          text="Log in with Google"
          image="/icons/google.svg"
          alt="google icon"
          onClick={loginHandler}
          className="p-3 mx-5 text-center rounded-lg flex text-white text-lg items-center w-full bg-[#222222] hover:bg-[#446eb1] duration-300"
          width={24}
          height={24}
          disabled={disabled}
          loader={false}
        />
      )}
    </>
  );
};

export default LogInGoogleButton;
