import sharp from "sharp"
import { config } from "../config"
import { Bring } from "./bringApi"
import type { GetItemsResponseEntry, LoadListsEntry } from "./bringZod"
import { lookupProduct } from "./lookupProduct"

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

    const newItemListUuid = lists.find((list) => list.name === config.bringConfig.newItemsListName)?.listUuid

    if (newItemListUuid === undefined) {
      console.error(`List with name ${config.bringConfig.newItemsListName} not found! Please create it!`)
      return
    }

    const product = await lookupProduct(eanCode)
    if (product === null) {
      console.log(`Product with EAN code ${eanCode} not found. Creating generic item.`)
      const productName = `${config.bringConfig.unknownProductName} ${eanCode.slice(-4)}`
      await bring.saveItem(newItemListUuid, productName, `EAN:${eanCode}`)
    } else {
      console.log(
        `Product ${product.title} by ${product.manufacturer} with EAN code ${eanCode} found. Adding to unknown list.`
      )
      const productName = `${product.title} (${product.manufacturer})`
      const googleUrl = `https://www.google.com/search?q=${eanCode}`
      const eanTag = `EAN:${eanCode}`
      await bring.saveItem(newItemListUuid, productName, `${googleUrl} ${eanTag}`)
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

const fakeBionelaEan = "4260019320537"
const erdnussmusEan = "4006040000211"
// const erdnussmusEan = "4006040000211"
const fakeBanane = "1234"

const main = async () => {
  const bring = new Bring(config.bringOptions)

  await bring.login()

  // await addItem(bring, erdnussmusEan)

  await uploadBringImageFromUrl(
    bring,
    "ed1f34f3-6309-49db-a7e7-311642d69c6a",
    "https://images.barcodelookup.com/23217/232177433-1.jpg"
  )

  // const lists = await bring.loadLists()
  // console.log(lists)

  // const items = await bring.getItems(lists.lists[0].listUuid)
  // console.log(items)

  // const detailedItems = await bring.getItemsDetails(lists.lists[0].listUuid)
  // console.log(detailedItems)

  // const product = await lookupProduct("4311501005262")
  // console.log(product)
}

main()
