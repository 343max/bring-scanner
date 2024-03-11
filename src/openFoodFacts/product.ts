import z from "zod"
import { cleanupProps } from "./cleanupProps"

const imageSizeSchema = z.enum(["display", "small", "thumb"])
type ImageSize = z.infer<typeof imageSizeSchema>

const imageTypeSchema = z.enum(["front", "ingredients", "nutrition", "packaging"])
export type ImageType = z.infer<typeof imageTypeSchema>

const localizedImagesSchema = z.record(z.string(), z.string())
const localizedImageSizesSchema = z.record(imageSizeSchema, localizedImagesSchema)

export const productSchema = z.preprocess(
  (data) => cleanupProps(data, /^product_name_([a-z]{2})$/, "product_name_localized"),
  z.object({
    code: z.string(),
    product_name: z.string(),
    product_name_localized: z.record(z.string(), z.string()),
    selected_images: z.record(imageTypeSchema, localizedImageSizesSchema).optional(),
  })
)

export type ProductSchema = z.infer<typeof productSchema>

export const getProductName = (product: ProductSchema, preferedLanguage: string): string => {
  const localizedName = product.product_name_localized[preferedLanguage]
  if (typeof localizedName === "string" && localizedName.length > 0) {
    return localizedName
  } else {
    return product.product_name
  }
}

export const getProductImage = (
  product: ProductSchema,
  imageType: ImageType,
  imageSize: ImageSize,
  preferedLanguage: string
): string | null => {
  const imageBundle = ((product.selected_images ?? {})[imageType] ?? {})[imageSize] ?? {}
  const localizedImage = imageBundle[preferedLanguage]
  if (localizedImage && localizedImage.length > 0) {
    return localizedImage
  } else {
    return Object.values(imageBundle)[0] ?? null
  }
}

export const openFoodFactsResponseSchema = z.object({
  code: z.string(),
  product: productSchema,
  status: z.literal(1),
  status_verbose: z.literal("product found"),
})
