import { config } from "./config"
import { googleCustomSearchResponse } from "./googleCustomSearchResponse"

type GoogleCustomSearchResponse = {
  name: string
  image: string | undefined
}

export const googleCustomSearch = async (EAN: string): Promise<GoogleCustomSearchResponse[]> => {
  if (!config.GOOGLE_API_KEY || !config.GOOGLE_CX) {
    console.log("GOOGLE_API_KEY and GOOGLE_CX must be set for google search")
    return []
  }
  const response = await fetch(
    `https://www.googleapis.com/customsearch/v1?key=${config.GOOGLE_API_KEY}&cx=${config.GOOGLE_CX}&q=${EAN}`
  )

  const json = await response.json()
  return googleCustomSearchResponse
    .parse(json)
    .items.filter((item) => item.pagemap?.product)
    .map((item) => {
      return item.pagemap?.product?.map((product) => {
        return {
          image: product.image,
          name: product.name,
        }
      })
    })
    .flatMap((x) => x ?? [])
}
