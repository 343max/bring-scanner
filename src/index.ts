import sharp from "sharp"
import { config } from "./config"
import { Bring } from "./bringApi"
import type { GetItemsResponseEntry, LoadListsEntry } from "./bringZodTypes"
import { lookupProduct } from "./lookupProduct"
import { serialScannerReader } from "./serialScannerReader"

type ItemOnList = {
  listUuid: string
  subList: "purchase" | "recently"
  item: GetItemsResponseEntry
}

const findItem = async (
  bring: Bring,
  lists: LoadListsEntry[],
  matching: (item: GetItemsResponseEntry) => boolean
): Promise<ItemOnList | null> => {
  for (const list of lists) {
    const { purchase, recently } = await bring.getItems(list.listUuid)
    for (const item of purchase) {
      if (matching(item)) {
        return { listUuid: list.listUuid, subList: "purchase", item }
      }
    }

    for (const item of recently) {
      if (matching(item)) {
        return { listUuid: list.listUuid, subList: "recently", item }
      }
    }
  }
  return null
}

const findItemByEanCode = async (
  bring: Bring,
  lists: LoadListsEntry[],
  eanCode: string
): Promise<ItemOnList | null> => {
  const regEx = new RegExp(`EAN:${eanCode}`)
  return findItem(bring, lists, (item) => regEx.test(item.specification))
}

const addItem = async (bring: Bring, eanCode: string) => {
  const lists = (await bring.loadLists()).lists
  const item = await findItemByEanCode(bring, lists, eanCode)
  if (item != null) {
    console.log(`Item with EAN code ${eanCode} found...`)
    if (item.subList === "purchase") {
      console.log(`...on the purchase list. Nothing to be done`)
    } else {
      console.log(`...on the recently list. Moving to purchase list`)
      await bring.saveItem(item.listUuid, item.item.name, item.item.specification)
    }
  } else {
    console.log(`Item with EAN code ${eanCode} not found and needs to be added`)

    const newItemListUuid = lists.find((list) => list.name === config.BRING_NEW_ITEMS_LIST)?.listUuid

    if (newItemListUuid === undefined) {
      console.error(`List with name ${config.BRING_NEW_ITEMS_LIST} not found! Please create it!`)
      return
    }

    const product = await lookupProduct(eanCode)
    const eanTag = `EAN:${eanCode}`
    if (product === null) {
      console.log(`Product with EAN code ${eanCode} not found. Creating generic item.`)
      const productName = `${config.BRING_UNKNOWN_PRODUC_NAME} ${eanCode.slice(-4)}`
      const googleUrl = `https://www.google.com/search?q=${eanCode}`
      await bring.saveItem(newItemListUuid, productName, `${googleUrl} ${eanTag}`)
      console.log("done")
    } else {
      const manufacturer = product.manufacturer.length > 0 ? product.manufacturer.replace(/^` /, "") : null
      console.log(
        `Product ${product.title} ${
          manufacturer != null ? `by ${manufacturer} ` : ""
        }with EAN code ${eanCode} found. Adding to unknown list.`
      )
      const productName = `${product.title} ${manufacturer != null ? ` (${manufacturer})` : ""}`
      await bring.saveItem(newItemListUuid, productName, eanTag)
      const imageUrl = product.images[0]
      if (imageUrl) {
        console.log("adding image...")
        const { uuid } = await bring.addItemUuid(newItemListUuid, productName)
        await uploadBringImageFromUrl(bring, uuid, imageUrl)
      }
      console.log("done")
    }
  }
}

const uploadBringImageFromUrl = async (bring: Bring, itemUuid: string, imageUrl: string) => {
  const response = await fetch(imageUrl)
  const blob = await response.blob()
  const buffer = await sharp(await blob.arrayBuffer())
    .resize({ width: 600, height: 600, fit: "inside" })
    .jpeg({ quality: 60 })
    .toBuffer()
  await bring.saveItemImage(itemUuid, new Blob([buffer], { type: "image/jpeg" }) as Blob)
}

const main = async () => {
  const bring = new Bring({ mail: config.BRING_EMAIL, password: config.BRING_PASSWORD })

  await bring.login()

  // @ts-expect-error
  const port = serialScannerReader("/dev/scanner", async (eanCode) => {
    console.log(`EAN code scanned: ${eanCode}`)
    await addItem(bring, eanCode)
  })

  console.log("Ready to scan!")

  // Keep the script running until it is killed
  process.stdin.resume()
  process.stdin.on("data", () => {})
}

main()
