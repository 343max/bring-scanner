import { config } from "./config"
import { GoogleProductResponse, googleResponseParseProducts } from "./googleCustomSearchResponse"

export const googleCustomSearch = async (EAN: string): Promise<GoogleProductResponse[]> => {
  if (!config.GOOGLE_API_KEY || !config.GOOGLE_CX) {
    console.log("GOOGLE_API_KEY and GOOGLE_CX must be set for google search")
    return []
  }
  const response = await fetch(
    `https://www.googleapis.com/customsearch/v1?key=${config.GOOGLE_API_KEY}&cx=${config.GOOGLE_CX}&q=${EAN}&lr=${config.GOOGLE_LANGUAGE}`
  )

  const json = await response.json()
  console.log(JSON.stringify(json, null, 2))

  return googleResponseParseProducts(json)
}
