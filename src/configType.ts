import type { BringOptions } from "./bringZodTypes"

export type Config = {
  bringOptions: BringOptions
  bringConfig: {
    newItemsListName: string
    unknownProductName: string
  }
  barcodelookup_com: {
    apiKey: string
    fakeResponse?: boolean
  }
  scanner: {
    delimiter: '\r' | '\n' | '\r\n'
  }
}