"use server";

import { getAll } from "@/utils/session/session-store";
import { deleteSession } from "..";

export type ReadSessionActionState =
  | { status: "idle" }
  | { status: "empty" }
  | { status: "success"; data: Record<string, string> };

export const readSessionAction = async (): Promise<ReadSessionActionState> => {
  const sessionData = await getAll();

  if (!sessionData || Object.keys(sessionData).length === 0) {
    await deleteSession();
    return { status: "empty" };
  }

  return {
    status: "success",
    data: sessionData,
  };
};
