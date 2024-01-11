import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import React from "react";

const Home = async () => {
  const session = await getServerSession(authOptions);
  if (session?.user) {
    return <h2 className="text-white">Welcome again</h2>;
  }

  return <h2>Please login to see this page.</h2>;
};

export default Home;
