"use client";
import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";

import { changePeriodOfChart } from "@/lib/utils";
import { ChartProps } from "@/types";

const LineChart = ({ data, period }: ChartProps) => {
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    changePeriodOfChart(period, data, setUserData);
  }, []);

  return (
    <div className="max-sm:h-96 h-96">
      {userData !== null && (
        <Line
          data={userData}
          options={{
            responsive: true,
            borderColor: "#2FF736",
            backgroundColor: "#2FF736",
            maintainAspectRatio: false,
          }}
        />
      )}
      {userData === null && (
        <p>
          Something gone wrong or you don't have any budgets in this period of
          time.
        </p>
      )}
    </div>
  );
};

export default LineChart;
