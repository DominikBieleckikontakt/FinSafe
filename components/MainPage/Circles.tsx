"use client";
import React from "react";
import Link from "next/link";

import { Button } from "..";

const Circles = () => {
  return (
    <>
      <div className="aspect-square p-3 md:p-4 2xl:p-5 border-solid border-primary border-2 border-t-transparent rounded-full animate-spin-slow flex justify-center items-center">
        <div className="aspect-square p-3 md:p-4 2xl:p-5 border-solid border-primary border-2 border-r-transparent rounded-full animate-spin-slow flex justify-center items-center">
          <div className="aspect-square p-32 sm:p-64 md:p-80 2xl:p-[20rem] border-solid border-primary border-2 border-b-transparent rounded-full animate-spin-slow flex justify-center items-center"></div>
        </div>
      </div>
      <div className="absolute flex flex-col">
        <Link href="/signup">
          <Button
            text="Sign up"
            className="text-[#efefef] w-full my-3 font-semibold text-xl p-3 px-4 sm:p-4 sm:px-12 rounded-md sm:text-xl bg-primary-darker border-2 border-transparent outline-none hover:bg-transparent hover:border-primary-darker duration-300 ease-linear"
            onClick={(e: React.MouseEvent) => {}}
            image=""
            alt=""
          />
        </Link>
        <Link href="/login">
          <Button
            text="Log in"
            className="text-[#efefef] w-full my-3 font-semibold text-xl p-3 px-4 sm:p-4 sm:px-16 rounded-md sm:text-xl border-2 border-primary-darker outline-none hover:bg-background-lighter hover:border-primary duration-300 ease-linear"
            image=""
            alt=""
            onClick={(e: React.MouseEvent) => {}}
          />
        </Link>
      </div>
    </>
  );
};

export default Circles;
