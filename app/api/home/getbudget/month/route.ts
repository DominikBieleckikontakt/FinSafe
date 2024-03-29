import prisma from "@/lib/prisma";
import { now } from "@/constants";
import { NextResponse } from "next/server";
import { numDays } from "@/lib/utils";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    const userBudget = await prisma.userBudget.findUnique({
      where: {
        userId: user.id,
      },
    });

    const thisMonth = Number(now.month);
    const thisMonthPlusOne = thisMonth + 1;

    let month: string;
    month = thisMonthPlusOne < 10 ? `0${Number(now.month) + 1}` : now.month;

    const fetchedBudgets = await prisma.dailyBudget.findMany({
      orderBy: {
        createdAt: "asc",
      },
      where: {
        userBudgetId: userBudget.id,
        createdAt: {
          gte: new Date(`${Number(now.year)}-${month}-01`),
          lte: new Date(
            `${Number(now.year)}-${month}-${numDays(
              Number(now.year),
              Number(Number(now.month) + 1)
            )}`
          ),
        },
      },
    });

    const budgets = fetchedBudgets.map((item) => {
      let id = -1;
      id++;
      return {
        id,
        createdAt: item.createdAt,
        todaysBudget: item.income - item.outcome,
        period: month,
      };
    });

    return NextResponse.json(
      {
        message: "Data fetched",
        budgets,
        status: 200,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Something gone wrong!", error },
      { status: 404 }
    );
  }
}
