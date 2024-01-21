"use client";
import React from "react";

import { now } from "@/constants";
import { Button } from "@/components";

const AddNewCard = () => {
  let month: string;
  month = Number(now.month + 1) < 10 ? `0${Number(now.month) + 1}` : now.month;

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
        <form>
          <div className="flex flex-col">
            <label htmlFor="income" className="ml-1 mb-1">
              Today's income:
            </label>
            <input
              type="number"
              id="income"
              className="p-2 rounded-md bg-[#4e4e4e] text-white outline-none"
              placeholder="Add your todays income"
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
            />
          </div>
          <div className="mt-5 text-right">
            <Button
              className="bg-green-600 rounded-md p-3 px-10 hover:bg-green-500 hover:scale-105 duration-300"
              text="Add"
              image=""
              alt=""
              loader={false}
              disabled={false}
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
