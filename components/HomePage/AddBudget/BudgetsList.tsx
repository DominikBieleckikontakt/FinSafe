"use client";
import React, { useState, useEffect } from "react";
import { easeInOut } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";

import { BudgetElement, LoadMore } from "../../";
import { AllBudgetInfoType } from "@/types";
import { MotionDiv } from "../../";
import { fetchData } from "@/lib/server-utils";

type SpecialBudgetType = {
  data: AllBudgetInfoType;
};

const variants = {
  hidden: {
    opacity: 0,
    y: "50%",
  },
  visible: {
    opacity: 1,
    y: "0%",
  },
};

const BudgetsList = ({ data }: SpecialBudgetType) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [budgets, setBudgets] = useState<AllBudgetInfoType[] | null>([]);
  const [message, setMessage] = useState<string>(
    "You don't have budget history or something gone wrong"
  );

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
      } else {
        setBudgets([
          {
            income: data.income,
            outcome: data.outcome,
            createdAt: data.createdAt,
            todaysBudget: data.todaysBudget,
          },
        ]);
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
        },
      });
    };

    getData().then((fetchedData) => {
      if (fetchedData.budgets !== null) {
        // if (budgets?.length > 0) {
        //   setBudgets((prevState) => [...prevState, ...fetchedData.budgets]);
        // } else {
        //   setBudgets([...fetchedData.budgets]);
        // }
        setBudgets([...fetchedData.budgets]);
      }
    });

    setIsLoading(false);
  }, []);

  const onDeleteHandler = async (createdAt: Date) => {
    const filteredBudgets = budgets.filter(
      (item) => item.createdAt !== createdAt
    );
    console.log(filteredBudgets);
    toast.success("Deleted", {
      style: {
        background: "#333",
        color: "#fff",
      },
    });

    if (filteredBudgets.length === 0) {
      setBudgets(null);
    } else {
      setBudgets(filteredBudgets);
    }

    fetchData("/api/home/deletebudget", {
      method: "POST",
      body: {
        createdAt,
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
        {(budgets?.length === 0 || budgets === null) && !isLoading && (
          <p className="text-white text-center font-bold text-xl">{message}</p>
        )}
        {budgets?.length > 0 && !isLoading && (
          <MotionDiv
            variants={variants}
            initial="hidden"
            animate="visible"
            transition={{
              delay: 0.1,
              ease: easeInOut,
              duration: 0.8,
            }}
            viewport={{ amount: 0 }}
          >
            <ul className="list-none -mb-10">
              {budgets.map((item, id) => (
                <BudgetElement
                  key={id}
                  budget={item}
                  onDelete={onDeleteHandler}
                  onEdit={onEditCardHandler}
                />
              ))}
            </ul>
          </MotionDiv>
        )}
        {budgets?.length >= 8 && (
          <LoadMore onDelete={onDeleteHandler} onEdit={onEditCardHandler} />
        )}
      </div>
      <div>
        <Toaster position="bottom-center" reverseOrder={false} />
      </div>
    </>
  );
};

export default BudgetsList;
