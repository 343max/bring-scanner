import { z } from "zod"

const ConfigSchema = z.object({
  ANYLIST_ENDPOINT: z.string().optional(),
  ANYLIST_EMAIL: z.string(),
  ANYLIST_PASSWORD: z.string(),
  ANYLIST_NEW_ITEMS_LIST: z.string(),
  ANYLIST_NEW_UNKNOWN_ITEM_NAME: z.string(),
  BARCODELOOKUP_API_KEY: z.string(),
  SCANNER_DELIMITER: z.union([z.literal("\r"), z.literal("\n"), z.literal("\r\n")]),
})

export const config = ConfigSchema.parse(process.env)
