"use client";
import React, { useState } from "react";

import { AllBudgetInfoType } from "@/types";
import { months } from "@/constants";
import {
  Button,
  EditBudgetCard,
  MotionDiv,
  ViewBudgetCard,
} from "@/components";
import { easeInOut } from "framer-motion";
import { calculateBudget } from "@/lib/utils";

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

const BudgetElement: React.FC<{ budget: AllBudgetInfoType }> = ({ budget }) => {
  const [isEditingMode, setIsEditingMode] = useState<boolean>(false);
  const [newData, setNewData] = useState(budget);

  const { createdAt } = budget;

  const date = {
    day: new Date(createdAt).getDate(),
    month: months[new Date(createdAt).getMonth()],
    year: new Date(createdAt).getFullYear(),
  };

  const toggleEditModeHandler = () => {
    setIsEditingMode(!isEditingMode);
  };

  //Changing existing data to new one, edited in edit mode
  const changeDataHandler = (newIncome: string, newOutcome: string) => {
    calculateBudget(newIncome, newOutcome, budget, setNewData);

    //TO DO: SENDING DATA FROM newData TO DB
  };

  return (
    <>
      <div>
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
          <div className="w-full bg-background-lighter text-white rounded-lg p-5 shadow-lg my-10 flex justify-between">
            {!isEditingMode && (
              <ViewBudgetCard
                budget={newData}
                todaysBudget={newData.todaysBudget}
                date={date}
                onChangeMode={toggleEditModeHandler}
              />
            )}
            {isEditingMode && (
              <EditBudgetCard
                budget={newData}
                todaysBudget={newData.todaysBudget}
                date={date}
                onChangeMode={toggleEditModeHandler}
                onChangeData={changeDataHandler}
              />
            )}
          </div>
        </MotionDiv>
      </div>
    </>
  );
};

export default BudgetElement;
