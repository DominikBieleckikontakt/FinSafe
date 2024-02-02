import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { createdAt, email } = body;

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

    const dailyBudget = await prisma.dailyBudget.findFirst({
      where: {
        userBudgetId: userBudget.id,
        createdAt,
      },
    });

    const budget = userBudget.budget;

    await prisma.userBudget.update({
      where: {
        userId: user.id,
      },
      data: {
        budget: budget - dailyBudget.income + dailyBudget.outcome,
      },
    });

    await prisma.dailyBudget.deleteMany({
      where: {
        userBudgetId: userBudget.id,
        createdAt,
      },
    });

    return NextResponse.json({ message: "Budget deleted" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "error", error }, { status: 400 });
  }
}
