import { authOptions } from "@/lib/auth";
import NextAuth from "next-auth";
import { cookies } from "next/headers";

// const handler = NextAuth(authOptions);

const handler = async () => {
  const maxAge = cookies().has("remember-me") ? 60 * 60 * 24 * 30 : 10;
  return await NextAuth({
    ...authOptions,
    session: {
      strategy: "jwt",
      maxAge,
    },
  });
};

export { handler as GET, handler as POST };
