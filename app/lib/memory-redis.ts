/**
 * In-memory Redis subset for local/dev when Upstash env is absent.
 * Supports get/set(+ex) used by scan-cache, ratelimit, and lead idempotency.
 */

type Entry = { value: unknown; expiresAt: number | null };

export class MemoryRedis {
  private store = new Map<string, Entry>();

  async get<T = unknown>(key: string): Promise<T | null> {
    const entry = this.store.get(key);
    if (!entry) return null;
    if (entry.expiresAt !== null && entry.expiresAt <= Date.now()) {
      this.store.delete(key);
      return null;
    }
    return entry.value as T;
  }

  async set(
    key: string,
    value: unknown,
    opts?: { ex?: number; nx?: boolean },
  ): Promise<string | null> {
    if (opts?.nx && this.store.has(key)) {
      const existing = this.store.get(key);
      if (
        existing &&
        (existing.expiresAt === null || existing.expiresAt > Date.now())
      ) {
        return null;
      }
    }
    const expiresAt =
      typeof opts?.ex === 'number' ? Date.now() + opts.ex * 1000 : null;
    this.store.set(key, { value, expiresAt });
    return 'OK';
  }

  async del(...keys: string[]): Promise<number> {
    let n = 0;
    for (const key of keys) {
      if (this.store.delete(key)) n += 1;
    }
    return n;
  }

  /** Test / restart seam */
  clear(): void {
    this.store.clear();
  }
}
