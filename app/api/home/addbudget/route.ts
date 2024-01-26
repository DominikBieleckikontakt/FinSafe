import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { now } from "@/constants";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { income, outcome } = body;
    const session = await getServerSession(authOptions);

    const actualIncome = Number(income);
    const actualOutome = Number(outcome);

    const user = await prisma.user.findUnique({
      where: {
        email: session?.user.email,
      },
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

    const actualBudget = budget.budget + actualIncome - actualOutome;

    await prisma.userBudget.update({
      where: {
        userId: user.id,
      },
      data: {
        budget: actualBudget,
      },
    });

    const isTodaysBudgetExist = await prisma.dailyBudget.findUnique({
      where: {
        createdAt: new Date(`${now.year}-${now.month + 1}-${now.day}`),
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
