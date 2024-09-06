import { z } from "zod";

export const exploreSchema = z.object({
  project: z.string().trim().min(1, "Please select a group first"),
  description: z.string().trim().min(1, "Please enter a description"),
  imageFields: z
    .array(
      z.object({
        id: z.string().trim().min(1, "Image ID is invalid"),
        name: z.string().trim().min(1, "Please select an image"),
        camera: z
          .number()
          .int("Camera index must be integer")
          .gte(0, "Camera index must be greater than or equal to 0"),
        tag: z.string().trim().min(1, "Please enter a tag for the image"),
      })
    )
    .min(1, "Images are required"),
});
