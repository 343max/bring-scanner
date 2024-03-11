import { z } from "zod"

const gooogleLanguages = [
  "lang_ar",
  "lang_bg",
  "lang_ca",
  "lang_cs",
  "lang_da",
  "lang_de",
  "lang_el",
  "lang_en",
  "lang_es",
  "lang_et",
  "lang_fi",
  "lang_fr",
  "lang_hr",
  "lang_hu",
  "lang_id",
  "lang_is",
  "lang_it",
  "lang_iw",
  "lang_ja",
  "lang_ko",
  "lang_lt",
  "lang_lv",
  "lang_nl",
  "lang_no",
  "lang_pl",
  "lang_pt",
  "lang_ro",
  "lang_ru",
  "lang_sk",
  "lang_sl",
  "lang_sr",
  "lang_sv",
  "lang_tr",
  "lang_zh-CN",
  "lang_zh-TW",
] as const

const ConfigSchema = z.object({
  ANYLIST_EMAIL: z.string(),
  ANYLIST_PASSWORD: z.string(),
  ANYLIST_NEW_ITEMS_LIST: z.string(),
  ANYLIST_NEW_UNKNOWN_ITEM_NAME: z.string(),

  OPEN_FOOD_FACTS_LANGUAGE: z.string(),

  SCANNER_DELIMITER: z.union([z.literal("\r"), z.literal("\n"), z.literal("\r\n")]),

  GOOGLE_API_KEY: z.string().optional(),
  GOOGLE_CX: z.string().optional(),
  GOOGLE_LANGUAGE: z.enum(gooogleLanguages).optional(),

  // if you need a reverse proxy to fiugre out whats going on
  ANYLIST_ENDPOINT: z.string().optional(),

  // comma separated list of EANs for testing
  TEST_EANS: z.string().optional(),
})

export const config = ConfigSchema.parse(process.env)
