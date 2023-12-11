import React from "react";

const Circles = () => {
  return (
    <div className="aspect-square p-3 md:p-4 2xl:p-5 border-solid border-primary border-2 border-t-transparent rounded-full animate-spin-slow flex justify-center items-center">
      <div className="aspect-square p-3 md:p-4 2xl:p-5 border-solid border-primary border-2 border-r-transparent rounded-full animate-spin-slow flex justify-center items-center">
        <div className="aspect-square p-32 sm:p-64 md:p-80 2xl:p-[20rem] border-solid border-primary border-2 border-b-transparent rounded-full animate-spin-slow flex justify-center items-center"></div>
      </div>
    </div>
  );
};

export default Circles;
