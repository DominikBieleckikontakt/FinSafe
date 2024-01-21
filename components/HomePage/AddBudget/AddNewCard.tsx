"use client";
import React, { useState } from "react";

import { now } from "@/constants";
import { Button } from "@/components";
import { AddNew } from "@/types";

const AddNewCard = ({ getData }: AddNew | null) => {
  const [income, setIncome] = useState<string>("");
  const [outcome, setOutcome] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  let month: string;
  month = Number(now.month + 1) < 10 ? `0${Number(now.month) + 1}` : now.month;

  const sendData = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true);

    const res = await fetch("/api/home/addbudget", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        income,
        outcome,
      }),
    });

    if (res.status === 402) {
      setMessage("You already have today's budget. You can edit existing one");
    }

    const data = await res.json();

    getData(data.todayBudget);

    setIncome("");
    setOutcome("");
    setIsLoading(false);
  };

  return (
    <div className="w-full bg-background-lighter text-white rounded-lg p-5 shadow-lg">
      <h2 className="text-xl">Add your today's budget</h2>
      <p className="text-sm text-zinc-400">
        Date:{" "}
        <b className="italic">
          {now.year}-{month}-{now.day}
        </b>
      </p>
      <div className="mt-5">
        <form onSubmit={sendData}>
          <div className="flex flex-col">
            <label htmlFor="income" className="ml-1 mb-1">
              Today's income:
            </label>
            <input
              type="number"
              id="income"
              className="p-2 rounded-md bg-[#4e4e4e] text-white outline-none"
              placeholder="Add your todays income"
              value={income}
              onChange={(e) => setIncome(e.target.value)}
            />
          </div>
          <div className="flex flex-col mt-8">
            <label htmlFor="income" className="ml-1 mb-1">
              Today's outcome:
            </label>
            <input
              type="number"
              id="income"
              className="p-2 rounded-md bg-[#4e4e4e] text-white outline-none"
              placeholder="Add your todays outcome"
              value={outcome}
              onChange={(e) => setOutcome(e.target.value)}
            />
          </div>
          <p className="mt-1">
            {message.length > 0 && (
              <span className="ml-1 text-red-500 font-bold">{message}</span>
            )}
          </p>
          <div className="mt-5 text-right">
            <Button
              className="bg-green-600 rounded-md p-3 px-10 hover:bg-green-500 hover:scale-105 duration-300"
              text="Add"
              image=""
              alt=""
              loader={isLoading}
              disabled={isLoading}
              width={0}
              height={0}
              onClick={() => {}}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewCard;
