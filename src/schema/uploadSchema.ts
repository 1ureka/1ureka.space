import { z } from "zod";

const uploadItemSchema = z.object({
  category: z.enum(["scene", "props"]),
  name: z.string().trim().min(1, { message: "Name is required" }),
  group: z.string().trim().min(1, { message: "Group is required" }),
  file: z
    .instanceof(File)
    .refine((file) => file.type.startsWith("image/"), "File must be an image"),
});

const uploadArraySchema = uploadItemSchema
  .array()
  .min(1, "At least one image is required");

const isUnique =
  (names: string[]) =>
  (array: z.infer<typeof uploadArraySchema>, ctx: z.RefinementCtx) => {
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

export const uploadSchema = z.object({ upload: uploadArraySchema });
export const createUploadSchema = (names: string[]) =>
  z.object({ upload: uploadArraySchema.superRefine(isUnique(names)) });
