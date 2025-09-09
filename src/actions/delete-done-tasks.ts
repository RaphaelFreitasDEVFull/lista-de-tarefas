"use server";

import { db } from "@/utils/db";

export const deleteDoneTasks = async () => {
  const done = await db.tasks.deleteMany({ where: { done: true } });

  if (!done) return;

  return done;
};
