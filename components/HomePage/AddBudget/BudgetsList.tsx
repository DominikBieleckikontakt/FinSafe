"use client";
import React, { useState, useMemo } from "react";

import { BudgetElement, LoadMore } from "../../";
import { AllBudgetInfoType } from "@/types";

const BudgetsList = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [budgets, setBudgets] = useState<AllBudgetInfoType[] | null>([]);
  const [message, setMessage] = useState<string>("");

  useMemo(() => {
    setIsLoading(true);
    fetch("/api/home/dailybudgets", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        limit: 0,
      }),
    })
      .then((res) => {
        if (res.status === 403) {
          setBudgets(null);
          setMessage("You don't have budget history or something gone wrong");
        }
        return res.json();
      })
      .then((data) => {
        setBudgets(data.budgets);
        setIsLoading(false);
      });
  }, []);

  return (
    <div>
      {isLoading && (
        <div className="flex flex-col items-center">
          <div className="rounded-full border-primary border-t-transparent border-4 border-solid animate-spin h-10 w-10 mb-3"></div>
          <p className="text-white mb-10 mt-1">We are loading your data...</p>
        </div>
      )}
      {budgets === null && <p>{message}</p>}
      {budgets !== null && (
        <ul className="list-none -mb-10">
          {budgets.map((item, id) => (
            <BudgetElement key={id} budget={item} />
          ))}
        </ul>
      )}
      {budgets.length >= 8 && <LoadMore />}
    </div>
  );
};

export default BudgetsList;
