"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

import { Button, Checkbox } from "..";
import { LogInFormType } from "@/types";
import { LoadingElement } from "..";

const LogInForm = () => {
  const router = useRouter();

  const [form, setForm] = useState<LogInFormType>({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isValid, setIsValid] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [keep, setKeep] = useState<boolean>(false);

  const onSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const logInData = await signIn("credentials", {
      email: form.email,
      password: form.password,
      redirect: false,
    });

    if (logInData?.error) {
      const { status } = JSON.parse(`${logInData?.error}`);
      setIsValid(false);
      setMessage("Oops, something went wrong!");
      status === 402 && setMessage("Wrong password. Try again, please.");
      status === 403 && setMessage("Account with that email doesn't exist.");
      setIsLoading(false);
    } else {
      setIsValid(true);
      setIsLoading(false);
      router.push("/home");
      router.refresh();
    }
  };

  return (
    <>
      {isLoading && <LoadingElement />}
      {!isLoading && (
        <div className="bg-[#323232b6] w-full mx-5 md:mx-48 xl:mx-[20rem] 2xl:mx-[35rem] rounded-lg mb-10">
          <form
            className="md:px-16 pb-6 pt-3 w-full"
            onSubmit={onSubmitHandler}
          >
            <div className="p-5 flex flex-col  pb-3">
              <label htmlFor="email" className="text-white font-light text-lg">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter your email"
                className="p-2 rounded-md bg-[#4e4e4e] text-white outline-none"
                required
                value={form.email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setForm((prevState) => ({
                    ...prevState,
                    email: e.target.value,
                  }))
                }
              />
            </div>
            <div className="p-5 flex flex-col pb-3">
              <label
                htmlFor="password"
                className="text-white font-light text-lg"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Enter your password"
                className="p-2 rounded-md bg-[#4e4e4e] text-white outline-none"
                required
                value={form.password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setForm((prevState) => ({
                    ...prevState,
                    password: e.target.value,
                  }))
                }
              />
            </div>
            {!isValid && (
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
                text="Log in!"
                onClick={() => {}}
              />
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default LogInForm;
