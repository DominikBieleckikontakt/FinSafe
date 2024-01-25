"use client";
import { AllBudgetInfoType } from "@/types";
import React, { useState } from "react";
import { BudgetElement, Button } from "../../";

let skip: number = 8;

const LoadMore: React.FC<{
  onDelete: (date: Date) => void;
  onEdit: () => void;
}> = ({ onDelete, onEdit }) => {
  const [data, setData] = useState<AllBudgetInfoType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchData = async () => {
    setIsLoading(true);
    const res = await fetch("/api/home/dailybudgets", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        limit: skip,
      }),
    });
    const budgetData = await res.json();
    const { budgets } = budgetData;
    setData([...data, ...budgets]);

    setIsLoading(false);

    skip += 8;
  };

  return (
    <div className="flex justify-center flex-col items-center w-full">
      <ul className="list-none w-full">
        {data.map((item, id) => (
          <BudgetElement
            onDelete={onDelete}
            onEdit={onEdit}
            key={id}
            budget={item}
          />
        ))}
      </ul>
      <Button
        text="Show more"
        image=""
        width={0}
        height={0}
        alt=""
        className=""
        onClick={fetchData}
        disabled={false}
        loader={false}
      />
      {isLoading && (
        <div className="rounded-full border-primary border-t-transparent border-4 border-solid animate-spin h-10 w-10 mt-10 mb-20" />
      )}
    </div>
  );
};

export default LoadMore;
