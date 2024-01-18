"use server";
import React from "react";

import { HomeMainCardProps } from "@/types";
import { Chart } from "..";

const MainCard = async ({ user }: HomeMainCardProps) => {
  const now = {
    day: new Date().getDate().toLocaleString(),
    month: new Date().getMonth().toLocaleString(),
    year: new Date().getFullYear().toLocaleString(),
  };

  return (
    <div className="bg-gradient-to-r from-slate-600 to-slate-700  mx-auto rounded-lg mb-10 shadow-md">
      <div className="p-5 backdrop-blur-lg bg-black bg-opacity-60 h-full w-full rounded-lg">
        <div className="text-white">
          <h1 className="text-2xl">
            Hello <b className="text-primary">{user.name}</b>
          </h1>
        </div>
        <div className="text-white sm:flex my-5">
          <p className="sm:pr-5 py-1 sm:py-0">
            Today's income: <span className="text-primary font-bold"></span>
          </p>
          <p className="sm:pl-5 py-1 sm:py-0">
            Today's outcome: <span className="text-primary font-bold"></span>
          </p>
        </div>
        <div>
          <div>
            <Chart />
          </div>
          <div>{/* SIDE CARD I */}</div>
          <div>{/* SIDE CARD II */}</div>
        </div>
      </div>
    </div>
  );
};

export default MainCard;
