"use client";
import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";

import { changePeriodOfChart } from "@/lib/utils";
import { ChartProps } from "@/types";
import { listOfColors } from "@/constants";

const BarChart = ({ data, period }: ChartProps) => {
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    changePeriodOfChart(period, data, setUserData);
  }, []);

  return (
    <div className="max-sm:h-96 h-96">
      {userData !== null && (
        <Bar
          data={userData}
          options={{
            responsive: true,
            scales: {
              y: {
                ticks: {
                  callback: function (value, index, ticks) {
                    return "$" + value;
                  },
                },
              },
            },
            plugins: {
              legend: {
                display: true,
              },
            },
            maintainAspectRatio: false,
            datasets: {
              bar: {
                label: "Your budget",
                backgroundColor: listOfColors,
              },
            },
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

export default BarChart;
