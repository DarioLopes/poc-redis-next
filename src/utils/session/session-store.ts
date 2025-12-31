import { getSessionId, getSessionIdAndCreateIfMissing, redis } from ".";

export async function get(key: string, namespace: string = "") {
  const sessionId = await getSessionId();

  if (!sessionId) return null;

  return redis.hget(`session-${namespace}-${sessionId}`, key);
}

export async function getAll(namespace: string = "") {
  const sessionId = await getSessionId();

  if (!sessionId) return null;

  return redis.hgetall(`session-${namespace}-${sessionId}`);
}

export async function set(key: string, value: string, namespace: string = "") {
  const sessionId = await getSessionIdAndCreateIfMissing();
  return redis.hset(`session-${namespace}-${sessionId}`, key, value);
}

export async function setMany(
  values: Record<string, string>,
  namespace: string = ""
) {
  const sessionId = await getSessionIdAndCreateIfMissing();
  const redisKey = `session-${namespace}-${sessionId}`;

  // ioredis supports multi-field hset
  return redis.hset(redisKey, values);
}
