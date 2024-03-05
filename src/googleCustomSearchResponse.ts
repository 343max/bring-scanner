import { z } from "zod"

export const googleCustomSearchResponse = z.object({
  items: z
    .array(
      z.object({
        pagemap: z
          .object({
            product: z
              .array(
                z.object({
                  image: z.string().optional(),
                  name: z.string(),
                })
              )
              .optional(),
          })
          .optional(),
      })
    )
    .optional(),
})
