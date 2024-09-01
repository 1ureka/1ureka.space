import "server-only";

import { validateUserSession } from "@/auth";
import { db } from "@/data/db";
import { log } from "@/utils/server-utils";

async function auth() {
  const session = await validateUserSession({ isRedirect: false });

  if (!session) {
    throw new Error(`Unauthorized access to database: User session not found`);
  }
}

export async function verifyAllCategory() {
  log("DATABASE", `verify metadata category`);

  try {
    await auth();

    const count = await db.imageMetadata.count({
      where: { NOT: { category: { in: ["scene", "props"] } } },
    });

    return count;
  } catch (error) {
    throw new Error(`Failed to verify metadata category`);
  }
}

export async function verifyAllThumbnail() {
  log("DATABASE", `verify thumbnails`);

  try {
    await auth();

    const count = await db.imageMetadata.count({
      where: { thumbnail: null },
    });

    return count;
  } catch (error) {
    throw new Error(`Failed to verify thumbnail`);
  }
}

export async function verifyAllOrigin() {
  log("DATABASE", `verify origins`);

  try {
    await auth();

    const count = await db.imageMetadata.count({
      where: { origin: null },
    });

    return count;
  } catch (error) {
    throw new Error(`Failed to verify origin`);
  }
}

export async function summaryCategorySize() {
  log("DATABASE", `summary category size`);

  try {
    const groupBy = await db.imageMetadata.groupBy({
      by: ["category"],
      _sum: { size: true },
    });

    const summary = groupBy.reduce((acc, { category, _sum }) => {
      acc[category] = _sum.size ?? NaN;
      return acc;
    }, {} as Record<string, number>);

    return summary;
  } catch (error) {
    throw new Error(`Failed to summary category size`);
  }
}
