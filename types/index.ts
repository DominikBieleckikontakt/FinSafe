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
  loader: boolean;
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

export type TodaysBudgetType = {
  income: number;
  outcome: number;
};

declare module "next-auth" {
  interface User {
    name: string | null;
    email: string | null;
  }
  interface Session {
    user: User & {
      name: string;
      email: string;
    };
    token: {
      name: string;
      email: string;
    };
  }
}

export type ChildrenProp = {
  children: React.ReactNode;
};

interface User {
  name: string | null;
  email: string;
}

export interface HomeMainCardProps {
  user: User & {
    name: string;
    email: string;
  };
}
