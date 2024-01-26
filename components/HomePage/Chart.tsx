"use client";
import { fetchData } from "@/lib/server-utils";
import React, { useState } from "react";

const Chart = () => {
  const [data, setData] = useState();

  // const budget = fetchData("", {
  //   method: "POST",
  //   body: {},
  // });

  return (
    <>
      <div>
        <div>
          <select></select>
        </div>
        <div>Chart</div>
      </div>
    </>
  );
};

export default Chart;
