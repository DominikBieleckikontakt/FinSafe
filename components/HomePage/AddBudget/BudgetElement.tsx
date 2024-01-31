"use client";
import React, { useState } from "react";
import { easeInOut } from "framer-motion";

import { AllBudgetInfoType } from "@/types";
import { months } from "@/constants";
import { EditBudgetCard, MotionDiv, ViewBudgetCard } from "@/components";
import { calculateBudget } from "@/lib/utils";
import { fetchData } from "@/lib/server-utils";

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

const BudgetElement: React.FC<{
  budget: AllBudgetInfoType;
  onDelete: (date: Date) => void;
  onEdit: () => void;
}> = ({ budget, onDelete, onEdit }) => {
  const [isEditingMode, setIsEditingMode] = useState<boolean>(false);
  const { createdAt } = budget;

  const date = {
    day: new Date(createdAt).getDate(),
    month: months[new Date(createdAt).getMonth()],
    year: new Date(createdAt).getFullYear(),
  };

  const deleteBudgetHandler = (passedDate: Date) => {
    onDelete(passedDate);
  };

  const toggleEditModeHandler = () => {
    setIsEditingMode(!isEditingMode);
  };

  //Changing existing data to new one, edited in edit mode
  const changeDataHandler = async (newIncome: string, newOutcome: string) => {
    const { updatedIncome, updatedOutcome, overallBudget } = calculateBudget(
      newIncome,
      newOutcome,
      budget
    );

    budget.income = updatedIncome;
    budget.outcome = updatedOutcome;
    budget.todaysBudget = overallBudget;
    budget.createdAt = createdAt;

    //TO DO: SENDING DATA FROM newData TO DB
    await fetchData("/api/home/editbudget", {
      method: "POST",
      body: {
        actualBudget: overallBudget,
        income: updatedIncome,
        outcome: updatedOutcome,
        createdAt: budget.createdAt,
      },
    });

    onEdit();
  };

  return (
    <MotionDiv
      variants={variants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      transition={{
        delay: 0.5,
        ease: easeInOut,
        duration: 0.8,
      }}
      viewport={{ once: true }}
    >
      <div className="w-full bg-background-lighter text-white rounded-lg p-5 shadow-lg my-10 flex justify-between">
        {!isEditingMode && (
          <ViewBudgetCard
            budget={budget}
            todaysBudget={budget.todaysBudget}
            date={date}
            onChangeMode={toggleEditModeHandler}
            onDelete={deleteBudgetHandler}
          />
        )}
        {isEditingMode && (
          <EditBudgetCard
            budget={budget}
            todaysBudget={budget.todaysBudget}
            date={date}
            onChangeMode={toggleEditModeHandler}
            onChangeData={changeDataHandler}
          />
        )}
      </div>
    </MotionDiv>
  );
};

export default BudgetElement;
