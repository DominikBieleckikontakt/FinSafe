import React from "react";

export type LogInGoogleButtonProps = {
  disabled: boolean;
};

export type ButtonProps = {
  className: string;
  text: string;
  image: string;
  alt: string;
  onClick: (e: React.MouseEvent) => void;
  width: number;
  height: number;
  disabled: boolean;
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
    name: string | null;
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

export type LogOutComponentProps = {
  children: React.ReactNode;
};
