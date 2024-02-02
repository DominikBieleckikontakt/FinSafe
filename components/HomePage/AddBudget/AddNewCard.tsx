"use client";
import React, { useState } from "react";
import { MotionDiv } from "@/components";
import { easeInOut } from "framer-motion";

import { fetchData } from "@/lib/server-utils";
import { now } from "@/constants";
import { Button } from "@/components";
import { AddNew } from "@/types";

const variants = {
  hidden: {
    opacity: 0,
    y: "-30%",
  },
  visible: {
    opacity: 1,
    y: "0%",
  },
};

const AddNewCard = ({ getData, email }: AddNew) => {
  const [income, setIncome] = useState<string>("");
  const [outcome, setOutcome] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const thisMonth = Number(now.month);
  const thisMonthPlusOne = thisMonth + 1;

  let month: string;
  month = thisMonthPlusOne < 10 ? `0${Number(now.month) + 1}` : now.month;

  let day: string;
  day = Number(now.day) < 10 ? `0${now.day}` : now.day;

  const sendData = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true);
    const data = await fetchData("/api/home/addbudget", {
      method: "POST",
      body: {
        income,
        outcome,
        email,
      },
    });

    if (data.budget === null || data === 402) {
      setMessage("You already have today's budget. You can edit existing one");
    } else {
      getData(data.todayBudget);
    }

    // const res = await fetch("/api/home/addbudget", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     income,
    //     outcome,
    //     email,
    //   }),
    // });

    // if (res.status === 402) {
    //   setMessage("You already have today's budget. You can edit existing one");
    // }

    // const data = await res.json();

    // getData(data.todayBudget);

    setIncome("");
    setOutcome("");
    setIsLoading(false);
  };

  return (
    <MotionDiv
      className="w-full bg-background-lighter text-white rounded-lg p-5 shadow-lg"
      variants={variants}
      initial="hidden"
      animate="visible"
      transition={{
        delay: 0.5,
        ease: easeInOut,
        duration: 0.8,
      }}
      viewport={{ amount: 0 }}
    >
      <h2 className="text-xl">Add your today's budget</h2>
      <p className="text-sm text-zinc-400">
        Date:{" "}
        <b className="italic">
          {now.year}-{month}-{day}
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
    </MotionDiv>
  );
};

export default AddNewCard;
