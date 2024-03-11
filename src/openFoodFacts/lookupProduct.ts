import { ProductSchema, openFoodFactsResponseSchema } from "./product"

export const lookupProduct = async (ean: string): Promise<ProductSchema | null> => {
  const response = await fetch(`https://world.openfoodfacts.org/api/v0/product/${ean}.json`)
  if (!response.ok) {
    return null
  }
  const data = await response.json()
  return openFoodFactsResponseSchema.parse(data).product
}
