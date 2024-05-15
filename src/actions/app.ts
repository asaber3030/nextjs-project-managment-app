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