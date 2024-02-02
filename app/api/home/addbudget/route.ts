import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";
import { now } from "@/constants";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { income, outcome, email } = body;

    const actualIncome = Number(income);
    const actualOutome = Number(outcome);

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    const budget = await prisma.userBudget.findUnique({
      where: {
        userId: user.id,
      },
    });

    const actualBudget = budget.budget + actualIncome - actualOutome;

    await prisma.userBudget.update({
      where: {
        userId: user.id,
      },
      data: {
        budget: actualBudget,
      },
    });

    const thisMonthPlusOne = Number(now.month) + 1;
    let month: string;
    month = thisMonthPlusOne < 10 ? `0${Number(now.month) + 1}` : now.month;

    let day: string;
    day = Number(now.day) < 10 ? `0${Number(now.day)}` : `${Number(now.day)}`;

    const isTodaysBudgetExist = await prisma.dailyBudget.findFirst({
      where: {
        createdAt: new Date(`${now.year}-${month}-${day}`),
        userBudgetId: budget.id,
      },
    });

    if (isTodaysBudgetExist) {
      return NextResponse.json(
        {
          message: "You already have today's budget. You can edit existing one",
        },
        { status: 402 }
      );
    }

    const newBudget = await prisma.dailyBudget.create({
      data: {
        income: actualIncome,
        outcome: actualOutome,
        todaysBudget: actualBudget,
        userBudgetId: budget?.id,
      },
    });

    const todayBudget = {
      income: newBudget.income,
      outcome: newBudget.outcome,
      todaysBudget: newBudget.todaysBudget,
      createdAt: newBudget.createdAt,
    };

    return NextResponse.json(
      { message: "Today's budget added successfully", todayBudget },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 404 });
  }
}
