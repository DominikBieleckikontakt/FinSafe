import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    const { limit } = await req.json();

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

    const userBudget = await prisma.userBudget.findUnique({
      where: {
        userId: user?.id,
      },
    });

    if (!userBudget) {
      return NextResponse.json(
        {
          budget: null,
          message:
            "This user doesn't have a budget. Something gone wrong during registration.",
        },
        { status: 401 }
      );
    }

    const dailyUserBudgets = await prisma.dailyBudget.findMany({
      where: {
        userBudgetId: userBudget?.id,
      },
      take: 8,
      orderBy: {
        createdAt: "desc",
      },
    });

    const budgets = new Array();

    dailyUserBudgets.map((item) => {
      budgets.push({
        income: item.income,
        outcome: item.outcome,
        createdAt: item.createdAt,
        todaysBudget: item.todaysBudget,
      });
    });

    if (budgets.length < 1) {
      return NextResponse.json(
        {
          budgets: null,
          message: "This user doesn't have daily budgets. ",
        },
        { status: 403 }
      );
    }

    return NextResponse.json(
      {
        message: "Server responded",
        budgets,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ message: "Error" }, { status: 500 });
  }
}
