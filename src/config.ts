import { z } from "zod"

const ConfigSchema = z.object({
  BRING_EMAIL: z.string(),
  BRING_PASSWORD: z.string(),
  BRING_URL: z.string().optional(),
  BRING_NEW_ITEMS_LIST: z.string(),
  BRING_UNKNOWN_PRODUC_NAME: z.string(),
  BARCODELOOKUP_API_KEY: z.string(),
  SCANNER_DELIMITER: z.union([z.literal("\r"), z.literal("\n"), z.literal("\r\n")]),
})

export const config = ConfigSchema.parse(process.env)
