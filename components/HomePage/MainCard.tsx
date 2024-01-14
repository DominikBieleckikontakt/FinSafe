import { HomeMainCardProps } from "@/types";
import React from "react";

const MainCard = ({ user }: HomeMainCardProps) => {
  return (
    <div className="bg-gradient-to-r from-slate-600 to-slate-700 mx-8 md:mx-36 xl:mx-[14rem] 2xl:mx-[20rem] rounded-lg mb-10">
      <div className="p-5 backdrop-blur-lg bg-black bg-opacity-60 h-full w-full rounded-lg">
        <div className="text-white">
          Hello, <b>{user.name}</b>
        </div>
      </div>
    </div>
  );
};

export default MainCard;
