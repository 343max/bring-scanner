// import sharp from "sharp"
import { config } from "./config"
// import { lookupProduct } from "./lookupProduct"
// import { serialScannerReader } from "./serialScannerReader"
import { anylistLogin } from "./anylistLogin"
import { AnylistClient } from "./anylistClient"
import { lookupProduct } from "./lookupProduct"
import sharp from "sharp"
// import fs from "fs"

// const main = async () => {
//   const bring = new Bring({ mail: config.BRING_EMAIL, password: config.BRING_PASSWORD })

//   await bring.login()

//   // @ts-expect-error
//   const port = serialScannerReader("/dev/scanner", async (eanCode) => {
//     console.log(`EAN code scanned: ${eanCode}`)
//     await addItem(bring, eanCode)
//   })

//   console.log("Ready to scan!")

//   // Keep the script running until it is killed
//   process.stdin.resume()
//   process.stdin.on("data", () => {})
// }

const resizeAndUploadImage = async (bring: AnylistClient, imageUrl: string): Promise<string> => {
  const response = await fetch(imageUrl)
  const blob = await response.blob()
  try {
    const buffer = await sharp(await blob.arrayBuffer())
      .resize({ width: 600, height: 600, fit: "inside" })
      .jpeg({ quality: 60 })
      .toBuffer()
    return await bring.uploadImage(new Blob([buffer]))
  } catch (e) {
    return await bring.uploadImage(blob)
  }
}

const handleItem = async (client: AnylistClient, eanCode: string) => {
  const list = (await client.newLists()).find((list) => list.name === config.ANYLIST_NEW_ITEMS_LIST)

  if (list === undefined) {
    throw new Error(`List ${config.ANYLIST_NEW_ITEMS_LIST} not found`)
  }

  const listId = list.identifier

  const regExp = new RegExp(`EAN:${eanCode}`)
  const item = (list.items ?? []).filter((item) => regExp.test(item.details ?? ""))[0]

  if (item) {
    if (!item.checked) {
      console.log(`item ${item.name} is already on the shopping list, nothing to do`)
    } else {
      console.log(`item ${item.name} is already on the shopping list, uncrossing it`)
      await client.setListItemChecked(item.listId ?? "", item.identifier, false)
    }
  } else {
    console.log(`Adding new product to the shopping list`)
    const lookup = await lookupProduct(eanCode)
    if (lookup === null) {
      console.log(`Could not find product with EAN code ${eanCode}. Adding as unknonw product`)
      await client.addItem(listId, {
        name: "New Product",
        details: `EAN:${eanCode} https://www.google.com/search?q=${eanCode}`,
      })
    } else {
      console.log(`Found product: ${lookup.title}`)
      const imageIds = await Promise.all(
        (lookup.images ?? []).map((imageUrl) => resizeAndUploadImage(client, imageUrl))
      )
      console.log(imageIds)
      await client.addItem(listId, {
        name: `${lookup.title} (${lookup.manufacturer})`,
        photoIds: imageIds,
        details: `${lookup.description} EAN:${eanCode}`,
      })
    }
  }
}

const main = async () => {
  const client = await anylistLogin(
    { email: config.ANYLIST_EMAIL, password: config.ANYLIST_PASSWORD },
    { endpoint: config.ANYLIST_ENDPOINT ?? "https://www.anylist.com/" }
  )
  await handleItem(client, "6920075776096")
}

main()
