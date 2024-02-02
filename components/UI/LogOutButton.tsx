"use client";
import React from "react";

import { Button } from "..";
import { signOut } from "next-auth/react";

const LogOutButton = () => {
  return (
    <Button
      className="my-3 pl-5 pr-2 py-2 sm:mr-24 rounded-md outline-none bg-background hover:bg-background-lighter duration-300 ease-linear"
      text=""
      alt="logout"
      image="/icons/logout.png"
      onClick={() =>
        signOut({
          redirect: true,
          callbackUrl: `${window.location.origin}/login`,
        })
      }
      width={36}
      height={36}
      loader={false}
      disabled={false}
    />
  );
};

export default LogOutButton;
