import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { actualBudget, income, outcome, createdAt, email } = body;

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

    await prisma.userBudget.update({
      where: {
        userId: user.id,
      },
      data: {
        budget: actualBudget,
      },
    });

    await prisma.dailyBudget.updateMany({
      where: {
        userBudgetId: userBudget.id,
        createdAt,
      },
      data: {
        income,
        outcome,
        todaysBudget: actualBudget,
      },
    });

    return NextResponse.json({ message: "Responded", status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error });
  }
}
