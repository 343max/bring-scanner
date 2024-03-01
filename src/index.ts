import { config } from "../config"
import type { BringItem, BringList } from "./bring"
import bringApi from "bring-shopping"

type ItemOnList = {
  listUuid: string
  subList: "purchase" | "recently"
  item: BringItem
}

const findItem = async (
  bring: bringApi,
  lists: BringList[],
  matching: (item: BringItem) => boolean
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

const findItemByEanCode = async (bring: bringApi, lists: BringList[], eanCode: string): Promise<ItemOnList | null> => {
  const regEx = new RegExp(`EAN:${eanCode}`)
  return findItem(bring, lists, (item) => regEx.test(item.specification))
}

const addItem = async (bring: bringApi, eanCode: string) => {
  const lists = (await bring.loadLists()).lists
  const item = await findItemByEanCode(bring, lists, eanCode)
  if (item === null) {
    console.log(`Item with EAN code ${eanCode} not found and needs to be added`)
  } else {
    console.log(`Item with EAN code ${eanCode} found...`)
    if (item.subList === "purchase") {
      console.log(`...on the purchase list. Nothing to be done`)
    } else {
      console.log(`...on the recently list. Moving to purchase list`)
      await bring.saveItem(item.listUuid, item.item.name, item.item.specification)
    }
  }
}

const fakeBionela = "4260019320537"

const main = async () => {
  const bring = new bringApi(config.bring)

  await bring.login()

  await addItem(bring, fakeBionela)

  // const items = await bring.getItems(lists.lists[0].listUuid)
  // console.log(items)

  // const detailedItems = await bring.getItemsDetails(lists.lists[0].listUuid)
  // console.log(detailedItems)

  // const product = await lookupProduct("4311501005262")
  // console.log(product)
}

main()
