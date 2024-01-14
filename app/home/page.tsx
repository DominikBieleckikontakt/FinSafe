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

  return <h2>Please login to see this page.</h2>;
};

export default Home;
