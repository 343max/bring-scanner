import { z } from "zod"

const ConfigSchema = z.object({
  ANYLIST_EMAIL: z.string(),
  ANYLIST_PASSWORD: z.string(),
  BARCODELOOKUP_API_KEY: z.string(),
  SCANNER_DELIMITER: z.union([z.literal("\r"), z.literal("\n"), z.literal("\r\n")]),
})

export const config = ConfigSchema.parse(process.env)
