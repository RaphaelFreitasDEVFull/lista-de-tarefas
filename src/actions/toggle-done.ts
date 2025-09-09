"use server";

import { db } from "@/utils/db";

export const toggleDone = async (id: string) => {
  try {
    if (!id) return;

    const currentTask = await db.tasks.findUnique({ where: { id } });

    if (!currentTask) return;

    const toggle = await db.tasks.update({
      where: {
        id,
      },
      data: {
        done: !currentTask.done,
      },
    });

    return toggle;
  } catch (error) {
    throw error;
  }
};
