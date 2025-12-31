"use server";

import { deleteSession } from "..";

export const deleteSessionAction = async (): Promise<void> => {
  await deleteSession(); // default namespace
};
