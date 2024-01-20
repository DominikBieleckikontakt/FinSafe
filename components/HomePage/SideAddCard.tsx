import React from "react";
import Link from "next/link";

const SideAddCard = () => {
  return (
    <Link href="/home/add-budget">
      <div className="text-white p-5 backdrop-blur-lg bg-black bg-opacity-20 rounded-lg hover:bg-transparent hover:cursor-pointer duration-500">
        <h2 className="text-xl text-center">Add your budget</h2>
        <p className="italic text-md font-light">
          Click to add new budget or edit existing one
        </p>
      </div>
    </Link>
  );
};

export default SideAddCard;
