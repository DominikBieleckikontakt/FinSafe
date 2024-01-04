import React from "react";
import Link from "next/link";
import { LogInForm } from "@/components";

const Login = () => {
  return (
    <div className="flex flex-col overflow-x-hidden overflow-y-hidden">
      <div className="text-white text-3xl pt-10 pb-10 text-center sm:pl-24 sm:text-left font-light italic">
        <Link href="/">
          Fin<span className="font-normal text-primary">Safe</span>
        </Link>
      </div>
      <div className="flex justify-center items-center h-full">
        <LogInForm />
      </div>
    </div>
  );
};

export default Login;
