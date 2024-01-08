import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "./prisma";
import { compare } from "bcrypt";
import { encode, decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  jwt: { encode, decode },
  pages: {
    signIn: "/login",
    signOut: "/",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "john@example.com",
        },
        password: { label: "Password", type: "password" },
        rememberMe: {
          label: "Remember me",
          type: "checkbox",
        },
      },
      async authorize(credentials, res) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const existingUser = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!existingUser) {
          throw new Error(
            JSON.stringify({ errors: "Wrong email", status: 403 })
          );
        }

        const passwordMatch = await compare(
          credentials?.password,
          existingUser.password
        );

        if (!passwordMatch) {
          throw new Error(
            JSON.stringify({ errors: "Wrong password", status: 402 })
          );
        }

        // if (credentials?.rememberMe) {
        //   cookies().set("remember-me", credentials?.rememberMe, {
        //     path: "/login",
        //     maxAge: 60 * 60 * 24 * 30,
        //     secure: false,
        //   });
        // }

        return {
          id: `${existingUser.id}`,
          name: existingUser.name,
          email: existingUser.email,
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          name: user.name,
        };
      }
      return token;
    },
    async session({ session, user, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          name: token.name,
        },
      };
    },
  },
};
