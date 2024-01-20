"use client";
import React from "react";
import Link from "next/link";

import { Button } from "..";

const HomeButton = () => {
  return (
    <Link href="/home">
      <Button
        className="flex justify-center items-center pl-2 my-3 py-2 sm:mr-12 rounded-md outline-none bg-background hover:bg-background-lighter duration-300 ease-linear"
        text=""
        alt="home"
        image="/icons/home.svg"
        onClick={() => {}}
        width={40}
        height={40}
        loader={false}
        disabled={false}
      />
    </Link>
  );
};

export default HomeButton;
