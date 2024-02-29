import bringApi from "bring-shopping"
import { config } from "../config"
import { lookupProduct } from "./lookupProduct"

const main = async () => {
  // const bring = new bringApi(config.bring)
  // try {
  //   await bring.login()
  //   console.log(`Successfully logged in as ${bring.name}`)
  // } catch (e: any) {
  //   console.error(`Error on Login: ${e.message}`)
  //   return
  // }
  // const lists = await bring.loadLists()
  // console.log(lists)

  const product = await lookupProduct("4311501005262")
  console.log(product)
}

main()
