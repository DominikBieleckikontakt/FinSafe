"use client";
import React, { useEffect, useState } from "react";

import { HomeMainCardProps, TodaysBudgetType } from "@/types";
import { Chart, SideAddCard, TodaysBudgetSummary } from "..";

const MainCard = ({ user }: HomeMainCardProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isTodaysBudget, setIsTodaysBudget] = useState<boolean>(false);
  const [todaysBudget, setTodaysBudget] = useState<TodaysBudgetType>({
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
        if (res.status === 202) {
          setIsTodaysBudget(false);
        }
        return res.json();
      })
      .then((data) => {
        setTodaysBudget({
          income: data.today?.income,
          outcome: data.today?.outcome,
        });
        if (data.today === null) {
          setIsTodaysBudget(false);
        }
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="bg-gradient-to-r from-slate-600 to-slate-700 mx-auto max-sm:mx-10 max-md:mx-16 md:w-[600px] lg:w-[900px] rounded-lg mb-10 shadow-lg">
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
              <TodaysBudgetSummary todaysBudget={todaysBudget} />
            ) : (
              <div className="text-white sm:flex mb-5 text-xl font-light">
                <p>
                  You didn't added today's budget. Maybe you want to do that?
                </p>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:grid md:grid-cols-subgrid md:row-span-2 md:col-span-2 bg-blue-500 text-white">
                <Chart />
              </div>
              <div className="rounded-lg bg-gradient-to-r from-slate-600 to-slate-700">
                <SideAddCard />
              </div>
              <div className="text-white bg-red-500">
                {/* SIDE CARD II */}sdsd
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MainCard;
