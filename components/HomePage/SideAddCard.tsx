import React from "react";
import Link from "next/link";

const SideAddCard: React.FC<{ email: string }> = ({ email }) => {
  return (
    <Link href={`/home/add-budget?email=${email}`}>
      <div className="text-white h-full p-5 backdrop-blur-lg bg-black bg-opacity-20 rounded-lg hover:bg-transparent hover:cursor-pointer duration-500">
        <h2 className="text-xl text-center">Add your budget</h2>
        <p className="italic text-md font-light">
          Click to add new budget, edit existing one or search your history
        </p>
      </div>
    </Link>
  );
};

export default SideAddCard;
