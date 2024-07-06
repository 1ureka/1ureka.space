import { z } from "zod";

const metadataItem = z.object({
  category: z.enum(["scene", "props"]),
  name: z.string().trim().min(1, { message: "Name is required" }),
  group: z.string().trim().min(1, { message: "Group is required" }),
});
const metadataWithFileItem = metadataItem.extend({
  file: z
    .instanceof(File)
    .refine((file) => file.type.startsWith("image/"), "File must be an image"),
});

//
//

const metadataArray = metadataItem
  .array()
  .min(1, "At least one image is required");
const metadataWithFileArray = metadataWithFileItem
  .array()
  .min(1, "At least one image is required");

//
//

type MetadataArray = z.infer<typeof metadataArray>;
type MetadataWithFileArray = z.infer<typeof metadataWithFileArray>;
function isUnique<T extends MetadataArray | MetadataWithFileArray>(
  names: string[]
) {
  return (array: T, ctx: z.RefinementCtx) => {
    const set = new Set(names);
    const entries = array.entries();

    for (const [i, { name }] of entries) {
      if (set.has(name)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Name must be unique",
          path: [i, "name"],
        });
      } else {
        set.add(name);
      }
    }
  };
}

//
//

export const MetadataSchema = z.object({
  fieldArray: metadataArray,
});
export const MetadataWithFileSchema = z.object({
  fieldArray: metadataWithFileArray,
});

export const createMetadataSchema = (names: string[]) =>
  z.object({
    fieldArray: metadataArray.superRefine(isUnique(names)),
  });
export const createMetadataWithFileSchema = (names: string[]) =>
  z.object({
    fieldArray: metadataWithFileArray.superRefine(isUnique(names)),
  });
