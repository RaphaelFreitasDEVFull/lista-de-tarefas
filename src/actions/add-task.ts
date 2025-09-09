"use server";

import { db } from "@/utils/db";

export const addTask = async (task: string) => {
  if (!task) return;

  const newTask = await db.tasks.create({ data: { task, done: false } });

  if (!newTask) return;

  return newTask;
};
