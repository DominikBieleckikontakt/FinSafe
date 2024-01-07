import React from "react";
import { LogInForm } from "@/components";

const Login = () => {
  return (
    <div className="overflow-x-hidden overflow-y-hidden">
      <div className="flex justify-center items-center h-[calc(100vh-10rem)]">
        <LogInForm />
      </div>
    </div>
  );
};

export default Login;
