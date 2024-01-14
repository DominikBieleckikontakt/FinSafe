import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { actualBudget, email } = body;

    const userData = prisma.user.findUnique({
      where: { email: email },
    });

    if (!userData) {
      return NextResponse.json(
        { user: null, message: "User doesn't exists" },
        { status: 401 }
      );
    }

    const isBudgetAlreadyExists = await prisma.user.findMany({
      where: {
        email,
        userBudget: {
          budget: { not: 0 },
        },
      },
    });

    if (isBudgetAlreadyExists.length > 0) {
      return NextResponse.json(
        { user: null, message: "User already has initialized his budget" },
        { status: 402 }
      );
    }

    const addBudget = await prisma.user.update({
      where: {
        email,
      },
      data: {
        userBudget: {
          create: {
            budget: actualBudget,
          },
        },
      },
    });

    return NextResponse.json(
      {
        user: addBudget,
        message: "Budget updated",
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ message: "Error" }, { status: 500 });
  }
}
