import React from "react";
import Image from "next/image";
import { TodaysBudgetType } from "@/types";

const TodaysBudgetSummary: React.FC<{ todaysBudget: TodaysBudgetType }> = ({
  todaysBudget,
}) => {
  return (
    <div className="text-white sm:flex my-5">
      <p className="sm:pr-5 py-1 sm:py-0 flex">
        Today's income:
        <span className="text-primary font-bold ml-1 flex items-center">
          ${todaysBudget?.income}
          <Image
            src="/icons/arrow-up.svg"
            alt="arrow-up"
            width={14}
            height={14}
          />
        </span>
      </p>
      <p className="sm:pl-5 py-1 sm:py-0 flex">
        Today's outcome:
        <span className="text-red-500 font-bold ml-1 flex items-center">
          ${todaysBudget?.outcome}
          <Image
            src="/icons/arrow-down.svg"
            alt="arrow-down"
            width={14}
            height={14}
          />
        </span>
      </p>
    </div>
  );
};

export default TodaysBudgetSummary;
