"use server";
import { Options } from "@/types";
import { headers } from "next/headers";

export const fetchData = async (url: string, options?: Options) => {
  const headersList = headers();
  const cookie = headersList.get("cookie");

  console.log(process.env.URL);
  console.log(url);
  const res = await fetch(`${process.env.URL}${url}`, {
    method: options.method,
    headers: {
      "Content-Type": "application/json",
      Cookie: cookie,
    },
    body: JSON.stringify(options.body),
  });

  if (!res.ok) {
    throw new Error(`${res.status}`);
  }

  const data = await res.json();
  return data;
};
