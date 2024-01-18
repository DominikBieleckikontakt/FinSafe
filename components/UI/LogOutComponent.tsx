"use client";
import React from "react";
import { signOut } from "next-auth/react";
import { ChildrenProp } from "@/types";

const LogOutComponent = ({ children }: ChildrenProp) => {
  return (
    <div
      onClick={() =>
        signOut({
          redirect: true,
          callbackUrl: `${window.location.origin}/`,
        })
      }
    >
      {children}
    </div>
  );
};

export default LogOutComponent;
