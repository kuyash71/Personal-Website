const windows = new Map<string, number[]>();

export function isAllowedByRateLimit(
  key: string,
  windowMs: number,
  maxRequests: number
): boolean {
  const now = Date.now();
  const windowStart = now - windowMs;

  const existing = windows.get(key) ?? [];
  const fresh = existing.filter((timestamp) => timestamp >= windowStart);

  if (fresh.length >= maxRequests) {
    windows.set(key, fresh);
    return false;
  }

  fresh.push(now);
  windows.set(key, fresh);
  return true;
}
