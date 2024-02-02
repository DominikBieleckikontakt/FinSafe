"use client";
import React, { useEffect, useState } from "react";
import { ChartElemetProps } from "@/types";
import { DoughnotChart, LineChart } from "..";
import { fetchData } from "@/lib/server-utils";

const ChartElement = ({ type, period, email }: ChartElemetProps) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const getData = async () => {
      return await fetchData(`/api/home/getbudget/${period}`, {
        method: "POST",
        body: {
          email,
        },
      });
    };

    getData().then((fetchedData) => {
      fetchedData !== null && setData(fetchedData.budgets);
      setIsLoading(false);
    });
    setIsLoading(false);
  }, [period]);

  return (
    <>
      {isLoading && (
        <div className="flex flex-col items-center">
          <div className="rounded-full border-primary border-t-transparent border-4 border-solid animate-spin h-10 w-10 mt-10 mb-3" />
        </div>
      )}
      {!isLoading && data === null && (
        <div>We cannot get your data. Sorry for trouble.</div>
      )}
      {!isLoading &&
        data !== null &&
        (type === "doughnut" ? (
          <DoughnotChart data={data} period={period} />
        ) : (
          <LineChart data={data} period={period} />
        ))}
    </>
  );
};

export default ChartElement;
