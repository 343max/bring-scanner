// import sharp from "sharp"
import { config } from "./config"
// import { lookupProduct } from "./lookupProduct"
// import { serialScannerReader } from "./serialScannerReader"
import { anylistLogin } from "./anylistLogin"
import { AnylistClinet } from "./anylistClient"

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
// }pa

const handleItem = async (client: AnylistClinet, eanCode: string) => {
  const regExp = new RegExp(`EAN:${eanCode}`)
  const item = (await client.allItems()).filter((item) => regExp.test(item.details ?? ""))[0]

  if (item) {
    if (!item.checked) {
      console.log(`item ${item.name} is already on the shopping list, nothing to do`)
    } else {
      console.log(`item ${item.name} is already on the shopping list, uncrossing it`)
      await client.setListItemChecked(item.listId ?? "", item.identifier, false)
    }
  }
}

const main = async () => {
  const client = await anylistLogin(
    { email: config.ANYLIST_EMAIL, password: config.ANYLIST_PASSWORD },
    { endpoint: "https://host.docker.internal:63448/" }
  )
  await handleItem(client, "4000405002476")
}

main()
