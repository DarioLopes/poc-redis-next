import "server-only";

import Redis from "ioredis";
import { cookies } from "next/headers";

export type SessionId = string;

export const redis = new Redis(
  process.env.REDIS_URL || "redis://localhost:6379"
);

export async function getSessionId(): Promise<SessionId | undefined> {
  const cookieStore = await cookies();

  return cookieStore.get("session-id")?.value;
}

async function setSessionId(sessionId: SessionId): Promise<void> {
  const cookieStore = await cookies();

  cookieStore.set("session-id", sessionId, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    secure: process.env.NODE_ENV === "production",
  });
}

export async function getSessionIdAndCreateIfMissing(): Promise<SessionId> {
  const sessionId = await getSessionId();

  if (!sessionId) {
    const newSessionId = crypto.randomUUID();
    await setSessionId(newSessionId);
    return newSessionId;
  }

  return sessionId;
}

export async function deleteSession(namespace: string = ""): Promise<void> {
  const sessionId = await getSessionId();
  if (!sessionId) return;

  await redis.del(`session-${namespace}-${sessionId}`);

  const cookieStore = await cookies();
  cookieStore.delete("session-id"); // supprime le cookie (path "/" par défaut)
}
