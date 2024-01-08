import { NavBar, SignForm } from "@/components";
import Link from "next/link";
import React from "react";

const SignUp = () => {
  return (
    <div className="overflow-x-hidden overflow-y-hidden">
      <div className="flex justify-center items-center mt-10">
        <SignForm />
      </div>
    </div>
  );
};

export default SignUp;
