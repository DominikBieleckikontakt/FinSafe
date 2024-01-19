"use client";
import React, { useEffect, useState } from "react";

import { months, now } from "@/constants";
import { HomeMainCardProps } from "@/types";
import { Chart } from "..";

const MainCard = ({ user }: HomeMainCardProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isTodaysBudget, setIsTodaysBudget] = useState<boolean>(false);
  const [todaysBudget, setTodaysBudget] = useState({
    income: 0,
    outcome: 0,
  });

  useEffect(() => {
    setIsLoading(true);
    fetch("/api/home", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: user.email,
      }),
    })
      .then((res) => {
        if (res.status === 201) {
          setIsTodaysBudget(true);
        }
        return res.json();
      })
      .then((data) => {
        setTodaysBudget({
          income: data.today.income,
          outcome: data.today.outcome,
        });
        if (data.today === null) {
          setIsTodaysBudget(false);
        }
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="bg-gradient-to-r from-slate-600 to-slate-700  mx-auto rounded-lg mb-10 shadow-md">
      <div className="p-5 backdrop-blur-lg bg-black bg-opacity-60 h-full w-full rounded-lg">
        {isLoading && (
          <div className="flex flex-col items-center">
            <div className="rounded-full border-primary border-t-transparent border-4 border-solid animate-spin h-10 w-10 mt-10 mb-3"></div>
            <p className="text-white mb-10 mt-1">We are loading your data...</p>
          </div>
        )}
        {!isLoading && (
          <>
            <div className="text-white">
              <h1 className="text-2xl font-light">
                Hello <b className="text-primary font-bold">{user.name}</b>
              </h1>
            </div>
            {isTodaysBudget ? (
              <div className="text-white sm:flex my-5">
                <p className="sm:pr-5 py-1 sm:py-0">
                  Today's income:
                  <span className="text-primary font-bold ml-1">
                    ${todaysBudget?.income}
                  </span>
                </p>
                <p className="sm:pl-5 py-1 sm:py-0">
                  Today's outcome:
                  <span className="text-primary font-bold ml-1">
                    ${todaysBudget?.outcome}
                  </span>
                </p>
              </div>
            ) : (
              <div className="text-white sm:flex my-5 text-xl font-light">
                <p>
                  You didn't added today's budget. Maybe you want to do that?
                </p>
              </div>
            )}

            <div>
              <div>
                <Chart />
              </div>
              <div>{/* SIDE CARD I */}</div>
              <div>{/* SIDE CARD II */}</div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MainCard;
