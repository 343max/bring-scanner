import { z } from "zod"
import { config } from "../config"
import { productSchema, type ProductSchema } from "./barcodeLookupResponse"

export const lookupProduct = async (barcode: string): Promise<ProductSchema | null> => {
  if (config.barcodelookup_com.fakeResponse) {
    return z.object({ products: z.array(productSchema) }).parse(fakeResponse).products[0]
  } else {
    const response = await fetch(
      `https://api.barcodelookup.com/v3/products?barcode=${barcode}&key=${config.barcodelookup_com.apiKey}`
    )
    if (response.status !== 200) {
      return null
    }
    const json = await response.json()
    return z.object({ products: z.array(productSchema) }).parse(json).products[0]
  }
}

const fakeResponse = {
  products: [
    {
      barcode_number: "4006040000211",
      barcode_formats: "EAN-13 4006040000211",
      mpn: "",
      model: "",
      asin: "",
      title: "Erdnussmus Fein",
      category: "Food, Beverages & Tobacco",
      manufacturer: "RAPUNZEL",
      brand: "Rapunzel",
      contributors: [],
      age_group: "",
      ingredients: "100% Erdnüsse (aus Kontrolliert Biologischem Anbau)",
      nutrition_facts:
        "Energy 630 kcal (2609 kJ), Fat 52 g, Saturated Fat 9.8 g, Carbohydrates 11 g, Sugars 5.4 g, Fiber 7.1 g, Protein 26 g, Salt 0.03 g, Vitamin E 0.0088 g, Vitamin B1 0.0002 g, Vitamin B6 0.0004 g, Iron 0.0023 g, Magnesium 0.214 g.",
      energy_efficiency_class: "",
      color: "",
      gender: "",
      material: "",
      pattern: "",
      format: "",
      multipack: "",
      size: "500 g",
      length: "",
      width: "",
      height: "",
      weight: "",
      release_date: "",
      description:
        "Erdnussmus fein. Allergens: En:nuts,en:peanuts. Labels: Organic, Vegetarian, EU Organic, Non-EU Agriculture, Vegan, DE-ÖKO-006, de:eg-öko-verordnung. Country of origin: Germany,Italy.",
      features: [],
      images: ["https://images.barcodelookup.com/23217/232177433-1.jpg"],
      last_update: "2023-10-24 03:02:14",
      stores: [
        {
          name: "Idealo AT",
          country: "EU",
          currency: "EUR",
          currency_symbol: "€",
          price: "5.24",
          sale_price: "",
          tax: [],
          link: "https://www.idealo.at/preisvergleich/OffersOfProduct//4376387.html?utm_medium=affiliate&utm_source=zanoxat&utm_campaign=!!!id!!!&utm_content=feed&camp=zanoxat",
          item_group_id: "",
          availability: "",
          condition: "",
          shipping: [],
          last_update: "2021-06-22 04:23:41",
        },
      ],
    },
  ],
}
