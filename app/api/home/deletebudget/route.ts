import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { createdAt } = body;

    const session = await getServerSession(authOptions);

    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    });

    const userBudget = await prisma.userBudget.findUnique({
      where: {
        userId: user.id,
      },
    });

    const dailyBudget = await prisma.dailyBudget.findUnique({
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

    await prisma.dailyBudget.delete({
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
