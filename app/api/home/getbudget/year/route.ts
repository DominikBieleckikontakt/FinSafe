import prisma from "@/lib/prisma";
import { now } from "@/constants";
import { NextResponse } from "next/server";

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

    const fetchedBudgets = await prisma.dailyBudget.findMany({
      where: {
        userBudgetId: userBudget.id,
        createdAt: {
          gte: new Date(`${Number(now.year)}-01-01`),
          lte: new Date(`${Number(now.year)}-12-31`),
        },
      },
    });

    const budgets = fetchedBudgets.map((item) => {
      let id = -1;
      id++;
      return {
        id,
        period: now.year,
        createdAt: item.createdAt,
        todaysBudget: item.todaysBudget,
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
