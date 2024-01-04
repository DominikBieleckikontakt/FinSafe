import React from "react";

export type ButtonProps = {
  className: string;
  text: string;
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
