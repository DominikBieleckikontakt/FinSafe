"use client";
import React, { useState } from "react";

import { fetchData } from "@/lib/server-utils";
import { AllBudgetInfoType } from "@/types";
import { BudgetElement, Button } from "../../";

let skip: number = 6;

const LoadMore: React.FC<{
  onDelete: (date: Date) => void;
  onEdit: () => void;
  email: string;
}> = ({ onDelete, onEdit, email }) => {
  const [data, setData] = useState<AllBudgetInfoType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [message, setMessage] = useState("");

  const getData = async () => {
    setIsLoading(true);
    const budgetData = await fetchData("/api/home/dailybudgets", {
      method: "POST",
      body: {
        limit: skip,
        email,
      },
    });

    const { budgets } = budgetData;
    if (budgets?.length > 0) {
      data?.length > 0 && setData((prevState) => [...prevState, ...budgets]);
      data?.length === 0 && setData([...budgets]);
      if (budgets.length < 6) {
        setMessage("You don't have any other budgets.");
      }
      skip += 6;
    } else {
      setMessage("You don't have any other budgets.");
    }
    setIsLoading(false);
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
      {!isLoading && message.length === 0 && (
        <Button
          text="Show more"
          image=""
          width={0}
          height={0}
          alt=""
          className="bg-gradient-to-r from-slate-600 to-slate-700 p-5 rounded-xl text-white m-10 hover:scale-105 duration-300"
          onClick={getData}
          disabled={false}
          loader={false}
        />
      )}
      {message.length > 0 && !isLoading && (
        <p className="text-white text-xl font-semibold">{message}</p>
      )}
      {isLoading && (
        <div className="rounded-full border-primary border-t-transparent border-4 border-solid animate-spin h-10 w-10 mt-10 mb-20" />
      )}
    </div>
  );
};

export default LoadMore;
