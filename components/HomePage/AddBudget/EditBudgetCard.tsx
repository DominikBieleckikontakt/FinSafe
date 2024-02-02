"use client";
import React, { useRef } from "react";
import { Button } from "@/components";
import { AllBudgetInfoType } from "@/types";

const EditBudgetCard: React.FC<{
  todaysBudget: number;
  date: any;
  budget: AllBudgetInfoType;
  onChangeMode: () => void;
  onChangeData: (newIncome: string, newOutcome: string) => void;
}> = ({ todaysBudget, date, budget, onChangeMode, onChangeData }) => {
  const incomeRef = useRef<HTMLInputElement>(null);
  const outcomeRef = useRef<HTMLInputElement>(null);

  const changeModeHandler = () => {
    const income = incomeRef.current.value;
    const outcome = outcomeRef.current.value;

    onChangeData(income, outcome);
    onChangeMode();
  };

  return (
    <div className="flex max-sm:flex-col sm:justify-between w-full">
      <div>
        <h3 className="text-xl font-bold text-primary-darker">
          {date.day} {date.month} {date.year}
        </h3>
        <div className="ml-1">
          <p className="my-2">
            Your income: $
            <input
              type="text"
              defaultValue={budget.income}
              className="p-1 rounded-md bg-[#4e4e4e] text-white outline-none mx-1"
              ref={incomeRef}
            />
          </p>
          <p className="my-2">
            Your outcome: $
            <input
              type="text"
              defaultValue={budget.outcome}
              className="p-1 rounded-md bg-[#4e4e4e] text-white outline-none mx-1"
              ref={outcomeRef}
            />
          </p>
        </div>
      </div>
      <div className="flex max-sm:mt-5 sm:flex-col justify-between max-sm:items-center">
        <div className="text-right">
          <Button
            text=""
            className="shadow-xl py-3 p-1 pl-3 pr-3 md:pr-1 rounded-lg bg-zinc-700 hover:bg-zinc-600 hover:scale-105 duration-300"
            width={24}
            height={24}
            image="/icons/check.svg"
            alt="edit"
            disabled={false}
            loader={false}
            onClick={changeModeHandler}
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

export default EditBudgetCard;
