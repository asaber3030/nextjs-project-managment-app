"use server";

import db from "@/services/prisma";

export async function getPlans() {
  try {
    const plans = await db.plan.findMany({
      include: { features: true },
      orderBy: { id: 'asc' }
    });
    return plans
  } catch (error) {
    throw error
  }
}

export async function getPlanById(id: number) {
  const plan = await db.plan.findUnique({
    where: { id },
  })
  return plan
}