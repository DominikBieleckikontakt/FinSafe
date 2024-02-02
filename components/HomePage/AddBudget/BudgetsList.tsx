"use client";
import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

import { BudgetElement, LoadMore } from "../../";
import { AllBudgetInfoType, SpecialBudgetType } from "@/types";
import { fetchData } from "@/lib/server-utils";

const BudgetsList = ({ data, email }: SpecialBudgetType) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isBudgets, setIsBudgets] = useState(false);
  const [budgets, setBudgets] = useState<AllBudgetInfoType[] | null>([]);

  const message = "You don't have budget history or something gone wrong";

  // Adding new data to the list
  useEffect(() => {
    if (data !== null && data !== undefined) {
      if (budgets?.length > 0) {
        setBudgets((prevState) => [
          {
            income: data.income,
            outcome: data.outcome,
            createdAt: data.createdAt,
            todaysBudget: data.todaysBudget,
          },
          ...prevState,
        ]);
        toast.success("Budget added", {
          style: {
            background: "#333",
            color: "#fff",
          },
        });
      } else {
        setBudgets([
          {
            income: data.income,
            outcome: data.outcome,
            createdAt: data.createdAt,
            todaysBudget: data.todaysBudget,
          },
        ]);
        toast.success("Budget added", {
          style: {
            background: "#333",
            color: "#fff",
          },
        });
      }
    }
  }, [data]);

  // Getting list of budgets from DB
  useEffect(() => {
    setIsLoading(true);

    const getData = async () => {
      return await fetchData("/api/home/dailybudgets", {
        method: "POST",
        body: {
          limit: 0,
          email,
        },
      });
    };

    getData().then((fetchedData) => {
      if (fetchedData === 403) {
        setIsBudgets(false);
      } else if (fetchedData.budgets !== null) {
        setBudgets([...fetchedData.budgets]);
        setIsBudgets(true);
      }

      setIsLoading(false);
    });
    setIsLoading(false);
  }, []);

  const onDeleteHandler = async (createdAt: Date) => {
    const filteredBudgets = budgets.filter(
      (item) => item.createdAt !== createdAt
    );
    if (filteredBudgets.length === 0) {
      setIsBudgets(false);
      setBudgets(filteredBudgets);
    }

    toast.success("Deleted", {
      style: {
        background: "#333",
        color: "#fff",
      },
    });

    fetchData("/api/home/deletebudget", {
      method: "POST",
      body: {
        createdAt,
        email,
      },
    });
  };

  const onEditCardHandler = () => {
    toast.success("Edited budget", {
      style: {
        background: "#333",
        color: "#fff",
      },
    });
  };

  return (
    <>
      <div>
        {isLoading && (
          <div className="flex flex-col items-center">
            <div className="rounded-full border-primary border-t-transparent border-4 border-solid animate-spin h-10 w-10 mb-3"></div>
            <p className="text-white mb-10 mt-1">We are loading your data...</p>
          </div>
        )}
        {!isLoading && !isBudgets && budgets.length === 0 && (
          <p className="text-white text-center font-bold text-xl">{message}</p>
        )}
        {budgets?.length > 0 && !isLoading && (
          <ul className="list-none -mb-10">
            {budgets.map((item, id) => (
              <BudgetElement
                key={id}
                budget={item}
                onDelete={onDeleteHandler}
                onEdit={onEditCardHandler}
                email={email}
              />
            ))}
          </ul>
        )}
        {budgets?.length >= 8 && (
          <LoadMore
            onDelete={onDeleteHandler}
            onEdit={onEditCardHandler}
            email={email}
          />
        )}
      </div>
      <div>
        <Toaster position="bottom-center" reverseOrder={false} />
      </div>
    </>
  );
};

export default BudgetsList;
