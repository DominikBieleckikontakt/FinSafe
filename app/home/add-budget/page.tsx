"use client";

import { AddNewCard, BudgetsList } from "@/components";
import { AllBudgetInfoType } from "@/types";
import React, { useState } from "react";

const AddBudget = () => {
  const [data, setData] = useState<AllBudgetInfoType | null>(null);

  const getNewBudget = (e: AllBudgetInfoType) => {
    setData(e);
  };

  return (
    <div className="overflow-x-hidden overflow-y-hidden">
      <div className="mt-24 mx-auto max-sm:mx-10 max-md:mx-16 md:w-[600px] lg:w-[720px] mb-36">
        <AddNewCard getData={getNewBudget} />
        <div className="flex items-center mt-10 mb-10">
          <div className="w-full h-[.09rem] bg-zinc-600 rounded-full" />
          <p className="w-full text-[#efefef] text-md text-center sm:text-lg md:text-xl">
            Your budget history
          </p>
          <div className="w-full h-[.09rem] bg-zinc-600 rounded-full" />
        </div>
        <BudgetsList data={data} />
      </div>
    </div>
  );
};

export default AddBudget;
