import { z } from "zod"
import { config } from "./config"
import { productSchema, type ProductSchema } from "./barcodeLookupResponse"

export const lookupProduct = async (barcode: string): Promise<ProductSchema | null> => {
  const response = await fetch(
    `https://api.barcodelookup.com/v3/products?barcode=${barcode}&key=${config.BARCODELOOKUP_API_KEY}`
  )
  if (response.status !== 200) {
    return null
  }
  const json = await response.json()
  return z.object({ products: z.array(productSchema) }).parse(json).products[0] ?? null
}
