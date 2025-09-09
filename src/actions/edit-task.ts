"use server";

import { db } from "@/utils/db";

export const editTask = async (task: string, id: string) => {
  if (!task || !id) return;

  const editedTask = await db.tasks.update({ where: { id }, data: { task } });

  if (!editedTask) return;

  return editedTask;
};
