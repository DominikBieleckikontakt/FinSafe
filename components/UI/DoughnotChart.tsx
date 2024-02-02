"use client";
import React, { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import "chart.js/auto";

import { changePeriodOfChart } from "@/lib/utils";
import { ChartProps } from "@/types";

const DoughnotChart = ({ data, period }: ChartProps) => {
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    changePeriodOfChart(period, data, setUserData);
  }, []);

  return (
    <div className="max-sm:h-96 h-96">
      {userData !== null && (
        <Doughnut
          data={userData}
          options={{
            responsive: true,
            plugins: {
              title: {
                text: "Your budget",
                display: true,
                color: "#FFFFFF",
              },
            },
            maintainAspectRatio: false,
            datasets: {
              doughnut: {
                label: "Your budget",
                borderRadius: 5,
                backgroundColor: [
                  "#5cb85c",
                  "#D74B4B",
                  "#6685a4",
                  "#f0ad4e",
                  "#5bc0de",
                  "#EE82EE",
                ],

                hoverBackgroundColor: [
                  "#5cb85c",
                  "#D74B4B",
                  "#6685a4",
                  "#f0ad4e",
                  "#5bc0de",
                  "#EE82EE",
                ],
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

export default DoughnotChart;
