import { config } from "./config"
import { serialScannerReader } from "./serialScannerReader"
import { anylistLogin } from "./anylistLogin"
import { AnylistClient } from "./anylistClient"
import { lookupProduct } from "./lookupProduct"
import sharp from "sharp"
import { googleCustomSearch } from "./googleCustomSearch"

const resizeAndUploadImage = async (client: AnylistClient, imageUrl: string): Promise<string> => {
  const response = await fetch(imageUrl)
  const originalBlob = await response.blob()
  const buffer = await sharp(await originalBlob.arrayBuffer())
    .resize({ width: 600, height: 600, fit: "inside" })
    .jpeg({ quality: 60 })
    .toBuffer()
  const resizedBlob = new Blob([buffer], { type: "image/jpeg" })
  const uploadBlob = resizedBlob.size > originalBlob.size ? originalBlob : resizedBlob
  return await client.uploadImage(uploadBlob)
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
      console.log(`Could not find product with EAN code ${eanCode}. Searching with google`)
      const googleResult = (await googleCustomSearch(eanCode))[0]
      if (googleResult !== undefined) {
        console.log(`Found product on google: ${googleResult.name}`)
        const itemId = await client.addItem(listId, {
          name: `${googleResult.name}`,
          details: `EAN:${eanCode}`,
        })

        if (googleResult.image) {
          console.log(`Uploading image for ${eanCode}`)
          const imageId = await resizeAndUploadImage(client, googleResult.image)
          await client.updateImage(listId, itemId, imageId)
        }
      } else {
        console.log(`Could not find product with EAN code ${eanCode}. Adding as unknonw product`)
        await client.addItem(listId, {
          name: "New Product",
          details: `EAN:${eanCode} https://www.google.com/search?q=${eanCode}`,
        })
      }
    } else {
      console.log(`Found product: ${lookup.title}`)
      const itemId = await client.addItem(listId, {
        name: `${lookup.title} (${lookup.manufacturer})`,
        details: `${lookup.description} EAN:${eanCode}`,
      })

      if (lookup.images[0]) {
        console.log(`Uploading image for ${eanCode}`)
        const imageId = await resizeAndUploadImage(client, lookup.images[0])
        await client.updateImage(listId, itemId, imageId)
      }
    }
  }
}

const main = async () => {
  const client = await anylistLogin(
    { email: config.ANYLIST_EMAIL, password: config.ANYLIST_PASSWORD },
    { endpoint: config.ANYLIST_ENDPOINT ?? "https://www.anylist.com/" }
  )

  if (typeof config.TEST_EANS === "string" && config.TEST_EANS.length > 0) {
    for (const eanCode of config.TEST_EANS.split(",")) {
      console.log(`Test EAN code: ${eanCode}`)
      await handleItem(client, eanCode.trim())
    }
  } else {
    const port = serialScannerReader("/dev/scanner", async (eanCode) => {
      console.log(`EAN code scanned: ${eanCode}`)
      await handleItem(client, eanCode)
    })

    console.log("Ready to scan!")

    // Keep the script running until it is killed
    process.stdin.resume()
    process.stdin.on("data", () => {})

    console.log("hanging on to", port)
  }
}

main()
