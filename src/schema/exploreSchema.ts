import { z } from "zod";

function isUnique(values: unknown[]): boolean {
  const set = new Set(values);
  return values.length === set.size;
}

function isUniqueName<
  Key extends string,
  T extends Record<Key, { name: string }[]>
>(key: Key, value: T) {
  const names = value[key].map((item) => item.name);
  return isUnique(names);
}

const variantSchema = z.object({
  name: z.string().trim().min(1, { message: "Name is required" }),
  group: z.string().trim().min(1, { message: "Group is required" }),
  metadataId: z.string().cuid("Invalid ID format").min(1),
});

const pointSchema = z.object({
  x: z.number().gte(0).lte(100),
  y: z.number().gte(0).lte(100),
  toView: z.number().int().positive(),
});

const viewSchema = z
  .object({
    name: z.string().trim().min(1, { message: "Name is required" }),
    variant: z.array(variantSchema).min(1),
    points: z.array(pointSchema),
  })
  .refine((value) => isUniqueName("variant", value), {
    message: "Variant names should be unique",
  })
  .refine(
    (value) => {
      const metadataIds = value.variant.map((variant) => variant.metadataId);
      return isUnique(metadataIds);
    },
    { message: "Variant Metadata ID should be unique" }
  )
  .refine(
    (value) => {
      const positions = value.points.map((point) => `${point.x},${point.y}`);
      return isUnique(positions);
    },
    { message: "Point position should be unique" }
  )
  .refine(
    (value) => {
      const targets = value.points.map((point) => point.toView);
      return isUnique(targets);
    },
    { message: "Point Target View should be unique" }
  );

export const ExploreSchema = z
  .object({
    name: z.string().trim().min(1, { message: "Name is required" }),
    description: z
      .string()
      .trim()
      .min(1, { message: "Description is required" }),
    views: z.array(viewSchema).nonempty(),
  })
  .refine((value) => isUniqueName("views", value), {
    message: "View names should be unique",
  })
  .refine(
    (value) => {
      const views = value.views.length;
      const points = value.views.map((view) => view.points.length);

      for (const point of points) {
        if (point !== views - 1) return false;
      }

      return true;
    },
    { message: "Number of points should be equal to number of views - 1" }
  )
  .refine(
    ({ views }) => {
      const totalViews = views.length;
      const toViews = views
        .map(({ points }) => points.map(({ toView }) => toView))
        .flat();

      for (const target of toViews) {
        if (target >= totalViews) return false;
      }

      return true;
    },
    { message: "Target view index should be less than total views" }
  );

// only can valid in backend:
// metadataId should exist in database and one metadataId should be used only once
// explore name should be unique in database
