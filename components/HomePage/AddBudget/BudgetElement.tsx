import React from "react";

import { AllBudgetInfoType } from "@/types";
import { months } from "@/constants";

const BudgetElement: React.FC<{ budget: AllBudgetInfoType }> = ({ budget }) => {
  const { createdAt, todaysBudget } = budget;

  const date = {
    day: new Date(createdAt).getDate(),
    month: months[new Date(createdAt).getMonth()],
    year: new Date(createdAt).getFullYear(),
  };

  return (
    <div className="w-full bg-background-lighter text-white rounded-lg p-5 shadow-lg my-10">
      <h3 className="text-xl font-bold text-primary-darker">
        {date.day} {date.month} {date.year}
      </h3>
      <div className="ml-1">
        <p className="my-2">
          Your income:{" "}
          <span className="text-primary font-bold">${budget.income}</span>
        </p>
        <p className="my-2">
          Your outcome:{" "}
          <span className="text-red-500 font-bold">${budget.outcome}</span>
        </p>
      </div>
      {todaysBudget > 0 ? (
        <div className="w-full text-right text-xl">
          Overall budget:{" "}
          <span className="text-primary font-bold">${todaysBudget}</span>
        </div>
      ) : (
        <div className="w-full text-right text-xl">
          Overall budget:{" "}
          <span className="text-red-500 font-bold">${todaysBudget}</span>
        </div>
      )}
    </div>
  );
};

export default BudgetElement;
