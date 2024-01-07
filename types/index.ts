import React from "react";
import NextAuth from "next-auth";

export type ButtonProps = {
  className: string;
  text: string;
  image: string;
  alt: string;
  onClick: (e: React.MouseEvent) => void;
};

export type SignUpForm = {
  name: string;
  lastname: string;
  email: string;
  password: string;
  rpassword: string;
};

export type LogInFormType = {
  email: string;
  password: string;
};

declare module "next-auth" {
  interface User {
    name: string;
  }
  interface Session {
    user: User & {
      name: string;
    };
    token: {
      name: string;
    };
  }
}
