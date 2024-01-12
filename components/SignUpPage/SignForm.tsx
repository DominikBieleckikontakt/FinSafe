"use client";
import { validateSignUpForm } from "@/lib/utils";
import { SignUpForm } from "@/types";
import LogInGoogleButton from "../LogInPage/LogInGoogleButton";
import { Button } from "..";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const SignForm = () => {
  const router = useRouter();
  const [form, setForm] = useState<SignUpForm>({
    name: "",
    lastname: "",
    email: "",
    password: "",
    rpassword: "",
  });
  const [isValid, setIsValid] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const onSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setIsValid(validateSignUpForm(form).isCorrect);

    if (validateSignUpForm(form).isCorrect) {
      const res = await fetch("/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        router.push("/");
        setIsLoading(false);
      } else {
        if (res.status === 409) {
          setIsValid(false);
          setMessage("Account with this email already exists!");
        }
        setIsLoading(false);
        console.error("Registration failed!");
      }
    } else {
      setIsValid(false);
      setIsLoading(false);
      setMessage(validateSignUpForm(form).message);
    }
  };

  return (
    <div className="bg-[#323232b6] w-full mx-5 md:mx-48 xl:mx-[20rem] 2xl:mx-[35rem] rounded-lg mb-10">
      <form className="md:px-16 pb-6 pt-3 w-full" onSubmit={onSubmitHandler}>
        <div className="p-5 pb-3 flex flex-col">
          <label htmlFor="name" className="text-white font-light text-lg">
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Enter your name"
            className="p-2 rounded-md bg-[#4e4e4e] text-white outline-none active:bg-[#4e4e4e]"
            required
            value={form.name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setForm((prevState) => ({
                ...prevState,
                name: e.target.value,
              }))
            }
          />
        </div>
        <div className="p-5 flex flex-col  pb-3">
          <label
            htmlFor="lastname"
            className="text-white font-light text-lg active:bg-[#4e4e4e]"
          >
            Lastname
          </label>
          <input
            type="text"
            name="lastname"
            id="lastname"
            placeholder="Enter your lastname"
            className="p-2 rounded-md bg-[#4e4e4e] text-white outline-none active:bg-[#4e4e4e]"
            required
            value={form.lastname}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setForm((prevState) => ({
                ...prevState,
                lastname: e.target.value,
              }))
            }
          />
        </div>
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
        <div className="p-5 flex flex-col  pb-3">
          <label htmlFor="password" className="text-white font-light text-lg">
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
        <div className="p-5 flex flex-col  pb-3">
          <label htmlFor="rpassword" className="text-white font-light text-lg">
            Repeat password
          </label>
          <input
            type="password"
            name="rpassword"
            id="rpassword"
            placeholder="Repeat your password"
            className="p-2 rounded-md bg-[#4e4e4e] text-white outline-none"
            required
            value={form.rpassword}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setForm((prevState) => ({
                ...prevState,
                rpassword: e.target.value,
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
            text="Sign up!"
            onClick={() => {}}
          />
        </div>
      </form>
      <div className="flex items-center mb-3 md:px-16">
        <div className="h-[2px] rounded-xl w-full bg-slate-600 ml-5"></div>
        <p className="px-3 text-slate-300">OR</p>
        <div className="h-[2px] rounded-xl w-full bg-slate-600 mr-5"></div>
      </div>
      <div className="md:px-16 pb-6 pt-3 w-full justify-center flex">
        <LogInGoogleButton disabled={isLoading} />
      </div>
    </div>
  );
};

export default SignForm;
