import { SignForm } from "@/components";
import Link from "next/link";
import React from "react";

const SignUp = () => {
  return (
    <div className="flex flex-col overflow-x-hidden overflow-y-hidden">
      <div className="text-white text-3xl pt-10 pb-10 text-center sm:pl-24 sm:text-left font-light italic">
        <Link href="/">
          Fin<span className="font-normal text-primary">Safe</span>
        </Link>
      </div>
      <div className="flex justify-center items-center h-full">
        <SignForm />
      </div>
    </div>
  );
};

export default SignUp;
