import { NextResponse } from "next/server";

import { now } from "@/constants";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email } = body;

    const user = await prisma.user.findUnique({
      where: { email: email },
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

    // await prisma.dailyBudget.create({
    //   data: {
    //     userBudgetId: budget?.id,
    //     income: 30,
    //     outcome: 10,
    //     todaysBudget: budget.budget,
    //   },
    // });

    const thisMonth = Number(now.month);
    const thisMonthPlusOne = thisMonth + 1;

    let month: string;
    month = thisMonthPlusOne < 10 ? `0${Number(now.month) + 1}` : now.month;

    let day: string;
    day = Number(now.day) < 10 ? `0${now.day}` : now.day;

    const todaysBudget = await prisma.dailyBudget.findFirst({
      where: {
        userBudgetId: budget?.id,
        createdAt: new Date(`${Number(now.year)}-${month}-${day}`),
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
      {
        message: "Request responded",
        today: todaysBudget,
        status: 201,
        allBudget: budget.budget,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}
