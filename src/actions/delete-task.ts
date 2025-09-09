"use server";

import { db } from "@/utils/db";

export const deleteTask = async (id: string) => {
  if (!id) return;

  const deletedTask = await db.tasks.delete({ where: { id } });

  if (!deletedTask) return;

  return deletedTask;
};
