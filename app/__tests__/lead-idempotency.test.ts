import { describe, it, expect } from 'vitest';
import {
  claimLeadSend,
  createMemoryIdempotencyStore,
  markLeadSent,
  releaseLeadClaim,
} from '@/app/lib/lead-idempotency';

describe('lead idempotency (SET NX)', () => {
  it('allows only one concurrent claim for the same email+scanId', async () => {
    const store = createMemoryIdempotencyStore();
    const email = 'owner@example.com';
    const scanId = 'scan_concurrent_abc123';

    const results = await Promise.all(
      Array.from({ length: 20 }, () => claimLeadSend(email, scanId, store)),
    );

    const claimed = results.filter((r) => r.status === 'claimed');
    const blocked = results.filter((r) => r.status === 'in_progress');

    expect(claimed).toHaveLength(1);
    expect(blocked).toHaveLength(19);
  });

  it('returns already_sent after markLeadSent', async () => {
    const store = createMemoryIdempotencyStore();
    const email = 'owner@example.com';
    const scanId = 'scan_sent_abc123';

    const first = await claimLeadSend(email, scanId, store);
    expect(first.status).toBe('claimed');

    await markLeadSent(email, scanId, store);

    const second = await claimLeadSend(email, scanId, store);
    expect(second.status).toBe('already_sent');
  });

  it('allows retry after releaseLeadClaim on Resend failure', async () => {
    const store = createMemoryIdempotencyStore();
    const email = 'owner@example.com';
    const scanId = 'scan_retry_abc123';

    expect((await claimLeadSend(email, scanId, store)).status).toBe('claimed');
    await releaseLeadClaim(email, scanId, store);
    expect((await claimLeadSend(email, scanId, store)).status).toBe('claimed');
  });
});
