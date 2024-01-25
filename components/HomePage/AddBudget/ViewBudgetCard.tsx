import React from "react";
import { Button } from "@/components";
import { AllBudgetInfoType } from "@/types";

const ViewBudgetCard: React.FC<{
  todaysBudget: number;
  date: any;
  budget: AllBudgetInfoType;
  onChangeMode: () => void;
  onDelete: (date: Date) => void;
}> = ({ todaysBudget, date, budget, onChangeMode, onDelete }) => {
  const changeModeHandler = () => {
    onChangeMode();
  };

  const onDeleteHandler = () => {
    onDelete(budget.createdAt);
  };

  return (
    <div className="flex max-sm:flex-col sm:justify-between w-full">
      <div>
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
      </div>
      <div className="flex-col justify-between flex max-sm:mt-5 sm:flex-col max-sm:items-center">
        <div className="text-right max-sm:mb-5">
          <Button
            text=""
            className="shadow-xl py-3 p-1 pl-3 rounded-lg bg-zinc-700 hover:bg-zinc-600 hover:scale-105 duration-300 mx-5"
            width={24}
            height={24}
            image="/icons/pencil.svg"
            alt="edit"
            disabled={false}
            loader={false}
            onClick={changeModeHandler}
          />
          <Button
            text=""
            className="shadow-xl py-3 p-1 pl-3 rounded-lg bg-zinc-700 hover:bg-zinc-600 hover:scale-105 duration-300"
            width={24}
            height={24}
            image="/icons/delete.svg"
            alt="edit"
            disabled={false}
            loader={false}
            onClick={onDeleteHandler}
          />
        </div>
        <div>
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
      </div>
    </div>
  );
};

export default ViewBudgetCard;
