import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "./prisma";
import { compare } from "bcrypt";
import { encode, decode } from "next-auth/jwt";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcrypt";

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
    GoogleProvider({
      clientId:
        "321967669711-1j9eaaup22g6ufmrons17730fqg6ae32.apps.googleusercontent.com",
      clientSecret: "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",
    }),
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
      async authorize(credentials) {
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

        if (existingUser.password) {
          const passwordMatch = await bcrypt.compare(
            credentials.password,
            existingUser.password
          );
          if (!passwordMatch) return null;
        } else {
          return null;
        }

        if (existingUser.password) {
          const passwordMatch = await compare(
            credentials?.password,
            existingUser.password
          );

          if (!passwordMatch) {
            throw new Error(
              JSON.stringify({ errors: "Wrong password", status: 402 })
            );
          }
        }

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
