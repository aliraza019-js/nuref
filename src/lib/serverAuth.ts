import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { readSession } from "@/lib/session";

export type CurrentUser = {
  id: number;
  email: string;
  name: string;
  role: string;
  status: string;
};

/**
 * Resolve the current user from the signed session cookie, hydrated with a
 * fresh row from the database. Returns null when there is no valid session
 * or the user no longer exists / is disabled.
 */
export async function getCurrentUser(request: NextRequest): Promise<CurrentUser | null> {
  const session = readSession(request);
  if (!session?.email) return null;

  const user = await prisma.user.findUnique({ where: { email: session.email } });
  if (!user || user.status !== "active") return null;

  return {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    status: user.status,
  };
}

/** Guard for authenticated API routes. */
export async function requireUser(
  request: NextRequest,
): Promise<{ user: CurrentUser } | { error: NextResponse }> {
  const user = await getCurrentUser(request);
  if (!user) {
    return { error: NextResponse.json({ message: "Authentication required" }, { status: 401 }) };
  }
  return { user };
}
