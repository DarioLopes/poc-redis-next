"use server";

import { getSessionId, redis } from "@/utils/session"; // ajuste le chemin
// ou utilise tes helpers si tu en as (mais ici on évite getSessionIdAndCreateIfMissing)

export type UpdateSessionActionState =
  | { status: "idle" }
  | { status: "success" }
  | { status: "error"; message: string };

export const updateSessionAction = async (
  _prev: UpdateSessionActionState,
  formData: FormData,
  namespace: string = ""
): Promise<UpdateSessionActionState> => {
  const sessionId = await getSessionId();
  if (!sessionId) {
    return {
      status: "error",
      message: "No session found (missing session-id cookie).",
    };
  }

  const username = String(formData.get("username") ?? "").trim();
  const age = String(formData.get("age") ?? "").trim();
  const country = String(formData.get("country") ?? "").trim();

  // Update only provided fields
  const updates: Record<string, string> = {};
  if (username) updates.username = username;
  if (age) updates.age = age;
  if (country) updates.country = country;

  if (Object.keys(updates).length === 0) {
    return { status: "error", message: "Nothing to update." };
  }

  await redis.hset(`session-${namespace}-${sessionId}`, updates);

  return { status: "success" };
};
