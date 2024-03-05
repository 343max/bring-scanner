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

export type GoogleProductResponse = {
  name: string
  image: string | undefined
}

export const googleResponseParseProducts = (json: any): GoogleProductResponse[] => {
  try {
    return (
      googleCustomSearchResponse
        .parse(json)
        .items?.filter((item) => item.pagemap?.product)
        .map((item) => {
          return item.pagemap?.product?.map((product) => {
            return {
              image: product.image,
              name: product.name,
            }
          })
        })
        .flatMap((x) => x ?? []) ?? []
    )
  } catch (error) {
    console.error(JSON.stringify(json, null, 2))
    throw error
  }
}

export const googleResponseFindProduct = (products: GoogleProductResponse[]): GoogleProductResponse | null => {
  if (products.length == 0) {
    return null
  } else {
    return {
      name: products[0]!.name,
      image: products.find((product) => product.image !== undefined)?.image ?? undefined,
    }
  }
}
