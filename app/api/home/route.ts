import { NextResponse } from "next/server";

import { now } from "@/constants";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email } = body;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        { user: null, message: "User doesn't exists" },
        { status: 401 }
      );
    }

    const budget = await prisma.userBudget.findUnique({
      where: {
        userId: user.id,
      },
    });

    if (!budget) {
      return NextResponse.json(
        {
          budget: null,
          message:
            "This user doesn't have a budget. Something gone wrong during registration.",
        },
        { status: 401 }
      );
    }

    const todaysBudget = await prisma.dailyBudget.findUnique({
      where: {
        userBudgetId: budget?.id,
        createdAt: new Date(`${now.year}-${now.month + 1}-${now.day}`),
      },
    });

    if (!todaysBudget) {
      return NextResponse.json(
        {
          message: "There is not today's budget",
          today: null,
        },
        {
          status: 202,
        }
      );
    }

    return NextResponse.json(
      { message: "POST request", today: todaysBudget },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ message: "Error" }, { status: 500 });
  }
}
