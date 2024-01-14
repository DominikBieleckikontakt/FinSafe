"use client";
import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { Button } from "..";

const FirstBudgetForm = () => {
  const router = useRouter();
  const params = useSearchParams();
  const email = params.get("email");

  const [budget, setBudget] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const onSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (budget.length > 0) {
      const actualBudget = Number(budget);

      const res = await fetch("/api/register-budget", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ actualBudget, email }),
      });

      if (!res.ok) {
        setIsLoading(false);
        const data = await res.json();

        if (res.status === 402) {
          setMessage(data.message);
          return;
        }
        setMessage("Something gone wrong");
        return;
      }

      router.push("/login");

      setIsLoading(false);
    }
  };

  return (
    <div className="bg-[#323232b6] w-full mx-5 md:mx-48 xl:mx-[20rem] 2xl:mx-[35rem] rounded-lg mb-10">
      <form className="md:px-16 pb-6 pt-3 w-full" onSubmit={onSubmitHandler}>
        <div className="p-5 flex flex-col  pb-3">
          <label
            htmlFor="budget"
            className="text-white font-light text-lg mb-2"
          >
            What is your currently budget? (in dollars)
          </label>
          <input
            required
            type="number"
            id="budget"
            className="p-2 rounded-md bg-[#4e4e4e] text-white outline-none"
            placeholder="Enter your budget..."
            value={budget}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setBudget(e.target.value)
            }
          />
        </div>
        {message.length > 0 && (
          <div className="text-red-600 font-bold pl-5">{message}</div>
        )}
        <div className="flex justify-center">
          <Button
            className="text-[#efefef] my-3 font-semibold text-xl p-3 px-4 sm:p-4 sm:px-12 rounded-md sm:text-xl bg-primary-darker border-2 border-transparent outline-none hover:bg-transparent hover:border-primary-darker duration-300 ease-linear"
            disabled={isLoading}
            image=""
            alt=""
            width={0}
            height={0}
            loader={isLoading}
            text="Submit"
            onClick={() => {}}
          />
        </div>
      </form>
    </div>
  );
};

export default FirstBudgetForm;
