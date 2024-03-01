import type { Config } from "./src/configType"

export const config: Config = {
  bringOptions: {
    mail: "your-bring-account@email.com",
    password: "p4ssw0rd",
    // url: "https://custom-endpoint-for-proxy/rest/v2/", // proxy
  },
  bringConfig: {
    newItemsListName: "Bitte Einordnen",
    unknownProductName: "Produkt", // name of a product that barcodelookup.com does not know.
  },
  barcodelookup_com: {
    apiKey: "barcodelookup.com-api-key",
  },
  scanner: {
    delimiter: "\r", // depends on the ocfiguration of the barcode scanner
  },
}
