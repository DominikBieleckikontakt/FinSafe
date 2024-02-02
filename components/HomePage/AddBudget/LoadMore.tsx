"use client";
import React, { useState } from "react";

import { fetchData } from "@/lib/server-utils";
import { AllBudgetInfoType } from "@/types";
import { BudgetElement, Button } from "../../";

let skip: number = 8;

const LoadMore: React.FC<{
  onDelete: (date: Date) => void;
  onEdit: () => void;
  email: string;
}> = ({ onDelete, onEdit, email }) => {
  const [data, setData] = useState<AllBudgetInfoType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getData = async () => {
    setIsLoading(true);
    // const res = await fetch("/api/home/dailybudgets", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     limit: skip,
    //   }),
    // });
    // const budgetData = await res.json();
    // const { budgets } = budgetData;
    // setData([...data, ...budgets]);
    const budgetData = await fetchData("/api/home/dailybudgets", {
      method: "POST",
      body: {
        limit: skip,
      },
    });
    const { budgets } = budgetData;
    if (data?.length > 0) {
      setData([...data, ...budgets]);
    } else {
      setData([...budgets]);
    }

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
            email={email}
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
        onClick={getData}
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
