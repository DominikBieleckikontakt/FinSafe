"use client";
import React, { useState, useEffect } from "react";
import { easeInOut } from "framer-motion";

import { BudgetElement, LoadMore } from "../../";
import { AllBudgetInfoType } from "@/types";
import { MotionDiv } from "../../";

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
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    if (data !== null) {
      setBudgets((prevState) => [data, ...prevState]);
    }
  }, [data]);

  useEffect(() => {
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
      {budgets.length > 0 && (
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
              <BudgetElement key={id} budget={item} />
            ))}
          </ul>
        </MotionDiv>
      )}
      {budgets?.length >= 8 && <LoadMore />}
    </div>
  );
};

export default BudgetsList;
