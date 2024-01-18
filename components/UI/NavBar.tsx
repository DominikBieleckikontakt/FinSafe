"use server";
import React from "react";
import Link from "next/link";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import { LogOutButton } from "..";
import { LogOutComponent } from "..";

const NavBar = async () => {
  const session = await getServerSession(authOptions);

  return (
    <div className="flex w-full">
      <div className="text-white text-3xl py-10 font-light italic pl-24 sm:text-left w-full">
        {session?.user && (
          <LogOutComponent>
            <Link href="/">
              Fin<span className="font-normal text-primary">Safe</span>
            </Link>
          </LogOutComponent>
        )}
        {!session?.user && (
          <Link href="/">
            Fin<span className="font-normal text-primary">Safe</span>
          </Link>
        )}
      </div>
      <div className="w-full py-5 flex justify-end">
        {session?.user && <LogOutButton />}
      </div>
    </div>
  );
};

export default NavBar;
