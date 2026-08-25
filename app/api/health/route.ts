/**
 * GET /api/health — liveness probe proving Route Handlers run on the
 * serverful deploy (fn-16 task .1, requirement R1).
 */
export const dynamic = 'force-dynamic';

export async function GET(): Promise<Response> {
  return Response.json(
    { status: 'ok', timestamp: new Date().toISOString() },
    { status: 200 },
  );
}
