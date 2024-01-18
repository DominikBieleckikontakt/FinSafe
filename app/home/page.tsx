import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import React from "react";

import { MainCard } from "@/components";

const Home = async () => {
  const session = await getServerSession(authOptions);

  if (session?.user) {
    return (
      <div className="overflow-x-hidden overflow-y-hidden">
        <div className="flex justify-center items-center mt-36 h-full">
          <MainCard user={session?.user} />
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-x-hidden overflow-y-hidden">
      <div className="flex justify-center items-center mt-36 h-full">
        <div className="bg-gradient-to-r from-slate-600 to-slate-700 mx-8 md:mx-36 xl:mx-[14rem] 2xl:mx-[20rem] rounded-lg mb-10 shadow-md">
          <div className="p-5 backdrop-blur-lg bg-black bg-opacity-60 h-full w-full rounded-lg">
            <div className="text-white font-bold">
              <h2>Please login to see this page.</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
