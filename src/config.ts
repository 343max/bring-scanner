import { z } from "zod"

const ConfigSchema = z.object({
  ANYLIST_EMAIL: z.string(),
  ANYLIST_PASSWORD: z.string(),
  ANYLIST_NEW_ITEMS_LIST: z.string(),
  ANYLIST_NEW_UNKNOWN_ITEM_NAME: z.string(),
  BARCODELOOKUP_API_KEY: z.string(),
  SCANNER_DELIMITER: z.union([z.literal("\r"), z.literal("\n"), z.literal("\r\n")]),
  GOOGLE_API_KEY: z.string().optional(),
  GOOGLE_CX: z.string().optional(),

  // if you need a reverse proxy to fiugre out whats going on
  ANYLIST_ENDPOINT: z.string().optional(),

  // comma separated list of EANs for testing
  TEST_EANS: z.string().optional(),
})

export const config = ConfigSchema.parse(process.env)
