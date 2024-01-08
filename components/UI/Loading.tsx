import React from "react";

const LoadingElement = () => {
  return (
    <div className="text-white w-full h-[50rem] flex justify-center items-center">
      <div className="rounded-full border-primary border-t-transparent border-4 border-solid animate-spin h-10 w-10"></div>
    </div>
  );
};

export default LoadingElement;
