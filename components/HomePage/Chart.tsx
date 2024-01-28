"use client";
import { fetchData } from "@/lib/server-utils";
import React, { ChangeEvent, useState } from "react";

import { now, months } from "@/constants";

const Chart = () => {
  const [data, setData] = useState();
  const [date, setDate] = useState();
  const [selectedDate, setSelectedDate] = useState("week");

  // const budget = fetchData("", {
  //   method: "POST",
  //   body: {},
  // });

  const onSelectChangeHandler = (e: ChangeEvent) => {
    const element = e.currentTarget as HTMLSelectElement;
    const value = element.value;

    const selected = value;
    setSelectedDate(selected);
  };

  return (
    <>
      <div>
        <div className="w-full flex justify-end">
          <select
            onChange={onSelectChangeHandler}
            value={selectedDate}
            className="bg-background p-2 rounded-lg font-light outline-none"
          >
            <option value="week">Week</option>
            <option value="month">Month</option>
            <option value="year">Year</option>
          </select>
        </div>
        <div>Chart</div>
      </div>
    </>
  );
};

export default Chart;
