import React from "react";

export type ButtonProps = {
  className: string;
  text: string;
  onClick: (e: React.MouseEvent) => void;
};
