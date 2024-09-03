import "server-only";

import { validateSession } from "@/auth";
import { db } from "@/data/db";
import { log } from "@/utils/server-utils";

async function auth() {
  const session = await validateSession({ redirect: false });

  if (!session) {
    throw new Error(`Unauthorized access to database: User session not found`);
  }
}

export async function getOriginById(metadataId: string) {
  log("DATABASE", `get origin by metadataId (${metadataId})`);
  await auth();

  try {
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
  log("DATABASE", `create origins`);
  await auth();

  try {
    const res = await db.origin.createMany({
      data: originList,
    });

    return res;
  } catch (error) {
    throw new Error(`Failed to create Origins`);
  }
}
