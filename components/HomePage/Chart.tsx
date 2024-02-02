"use client";
import React, { ChangeEvent, useState } from "react";
import { ChartElement } from "..";

const Chart: React.FC<{ email: string }> = ({ email }) => {
  const [selectedDate, setSelectedDate] = useState("month");
  const [chart, setChart] = useState("line");

  const onSelectPeriodChangeHandler = (e: ChangeEvent) => {
    const element = e.currentTarget as HTMLSelectElement;
    const value = element.value;

    const selectedPeriod = value;
    setSelectedDate(selectedPeriod);
  };

  const toggleChart = (e: ChangeEvent) => {
    const element = e.currentTarget as HTMLSelectElement;
    const value = element.value;

    const selectedChart = value;
    selectedChart === "doughnut" ? setChart("doughnut") : setChart("line");
  };

  return (
    <>
      <div>
        <div className="w-full flex justify-end">
          <select
            onChange={onSelectPeriodChangeHandler}
            value={selectedDate}
            className="bg-background p-2 rounded-lg font-light outline-none mx-5"
          >
            {/* <option value="week">Week</option> */}
            <option value="month">Month</option>
            <option value="year">Year</option>
          </select>
          <select
            onChange={toggleChart}
            value={chart}
            className="bg-background p-2 rounded-lg font-light outline-none"
          >
            <option value="line">Line</option>
            <option value="doughnut">Doughnut</option>
          </select>
        </div>
        <ChartElement type={chart} period={selectedDate} email={email} />
      </div>
    </>
  );
};

export default Chart;
