import "server-only";

import { validateSession } from "@/auth";
import { db } from "@/data/db";

async function auth() {
  const session = await validateSession({ redirect: false });

  if (!session) {
    throw new Error(`Unauthorized access to database: User session not found`);
  }
}

export async function getOriginById(metadataId: string) {
  try {
    await auth();

    const origin = await db.origin.findUnique({
      where: { metadataId },
      select: { bytes: true },
    });

    return origin;
  } catch (error) {
    throw new Error(`Failed to query origin`);
  }
}

export async function createOrigins(
  originList: { metadataId: string; bytes: Buffer }[]
) {
  try {
    await auth();

    const res = await db.origin.createMany({
      data: originList,
    });

    return res;
  } catch (error) {
    throw new Error(`Failed to create Origins`);
  }
}
