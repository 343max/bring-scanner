// copied from https://github.com/foxriver76/node-bring-api/ for now

import { z } from "zod"
import {
  getAllUsersFromListResponseSchema,
  getItemsDetailsEntrySchema,
  getItemsResponseSchema,
  getPendingInvitationsResponseSchema,
  getUserSettingsResponseSchema,
  loadCatalogResponseSchema,
  loadListsResponseSchema,
  loginResponse,
  type BringOptions,
  type GetAllUsersFromListResponse,
  type GetItemsDetailsEntry,
  type GetItemsResponse,
  type GetPendingInvitationsResponse,
  type GetUserSettingsResponse,
  type LoadCatalogResponse,
  type LoadListsResponse,
} from "./bringZod"

export class Bring {
  private readonly mail: string
  private readonly password: string
  private readonly url: string
  private uuid: string
  private readonly headers: {
    "X-BRING-CLIENT-SOURCE": string
    "X-BRING-COUNTRY": string
    "X-BRING-CLIENT": string
    "X-BRING-API-KEY": string
    Authorization?: string
    "X-BRING-USER-UUID"?: string
  }
  public name?: string
  private bearerToken?: string
  private refreshToken?: string
  private putHeaders?: {
    Authorization?: string
    "X-BRING-USER-UUID"?: string
    "X-BRING-CLIENT-SOURCE": string
    "X-BRING-COUNTRY": string
    "X-BRING-CLIENT": string
    "X-BRING-API-KEY": string
    "Content-Type": string
  }

  constructor(options: BringOptions) {
    this.mail = options.mail
    this.password = options.password
    this.url = options.url || "https://api.getbring.com/rest/v2/"
    this.uuid = options.uuid || ""
    this.headers = {
      "X-BRING-API-KEY": "cof4Nc6D8saplXjE3h3HXqHH8m7VU2i1Gs0g85Sp",
      "X-BRING-CLIENT": "webApp",
      "X-BRING-CLIENT-SOURCE": "webApp",
      "X-BRING-COUNTRY": "DE",
    }
  }

  /**
   * Try to log into given account
   */
  async login(): Promise<void> {
    try {
      const loginData = new URLSearchParams({ email: this.mail, password: this.password })

      const response = await fetch(`${this.url}bringauth`, {
        method: `POST`,
        body: loginData,
        headers: this.headers,
      })

      const json = await response.json()
      const data = loginResponse.parse(json)
      this.name = data.name
      this.uuid = data.uuid
      this.bearerToken = data.access_token
      this.refreshToken = data.refresh_token

      this.headers[`X-BRING-USER-UUID`] = this.uuid
      this.headers[`Authorization`] = `Bearer ${this.bearerToken}`
      this.putHeaders = {
        ...this.headers,
        ...{ "Content-Type": `application/x-www-form-urlencoded; charset=UTF-8` },
      }
    } catch (e: any) {
      throw new Error(`Cannot Login: ${e.message}`)
    }
  }

  /**
   *   Loads all shopping lists
   */
  async loadLists(): Promise<LoadListsResponse> {
    try {
      const response = await fetch(`${this.url}bringusers/${this.uuid}/lists`, { headers: this.headers })
      const data = await response.json()
      return loadListsResponseSchema.parse(data)
    } catch (e: any) {
      throw new Error(`Cannot get lists: ${e.message}`)
    }
  }

  /**
   *   Get all items from the current selected shopping list
   */
  async getItems(listUuid: string): Promise<GetItemsResponse> {
    try {
      const response = await fetch(`${this.url}bringlists/${listUuid}`, { headers: this.headers })
      const data = await response.json()
      return getItemsResponseSchema.parse(data)
    } catch (e: any) {
      throw new Error(`Cannot get items for list ${listUuid}: ${e.message}`)
    }
  }

  /**
   *   Get detailed information about all items from the current selected shopping list
   */
  async getItemsDetails(listUuid: string): Promise<GetItemsDetailsEntry[]> {
    try {
      const response = await fetch(`${this.url}bringlists/${listUuid}/details`, { headers: this.headers })
      const data = await response.json()
      return z.array(getItemsDetailsEntrySchema).parse(data)
    } catch (e: any) {
      throw new Error(`Cannot get detailed items for list ${listUuid}: ${e.message}`)
    }
  }

  /**
   *   Save an item to your current shopping list
   *
   *   @param itemName The name of the item you want to send to the bring server
   *   @param specification The litte description under the name of the item
   *   @param listUuid The listUUID you want to receive a list of users from.
   *   returns an empty string and answerHttpStatus should contain 204. If not -> error
   */
  async saveItem(listUuid: string, itemName: string, specification: string): Promise<string> {
    try {
      const response = await fetch(`${this.url}bringlists/${listUuid}`, {
        method: "PUT",
        headers: this.putHeaders,
        body: new URLSearchParams({
          purchase: itemName,
          recently: "",
          specification: specification,
          remove: "",
        }),
      })
      const data = await response.text()
      return data
    } catch (e: any) {
      throw new Error(`Cannot save item ${itemName} (${specification}) to ${listUuid}: ${e.message}`)
    }
  }

  /**
   *   Save an image to an item
   *
   *   @param itemUuid The itemUUID which will be updated
   *   @param image The image you want to link to the item
   *   returns an imageUrl and answerHttpStatus should contain 204. If not -> error
   */
  async saveItemImage(itemUuid: string, image: Blob): Promise<string> {
    try {
      const formData = new FormData()
      formData.append("imageData", image, "image.jpg")

      formData.forEach((value, key) => {
        console.log(`${key}: ${value}`)
      })

      const response = await fetch(`${this.url}bringlistitemdetails/${itemUuid}/image`, {
        method: "PUT",
        headers: this.headers,
        body: formData,
      })

      const data = await response.json()
      console.log(response.status, data)
      return z.object({ imageUrl: z.string() }).parse(data).imageUrl
    } catch (e: any) {
      throw e
      throw new Error(`Cannot save item image ${itemUuid}: ${e.message}`)
    }
  }

  /**
   *   remove an item from your current shopping list
   *
   *   @param listUuid The listUUID you want to remove a item from
   *   @param itemName Name of the item you want to delete from you shopping list
   *   should return an empty string and $answerHttpStatus should contain 204. If not -> error
   */
  async removeItem(listUuid: string, itemName: string): Promise<string> {
    try {
      const response = await fetch(`${this.url}bringlists/${listUuid}`, {
        method: "PUT",
        headers: this.putHeaders,
        body: new URLSearchParams({
          purchase: "",
          recently: "",
          specification: "",
          remove: itemName,
        }),
      })
      const data = await response.json()
      return z.string().parse(data)
    } catch (e: any) {
      throw new Error(`Cannot remove item ${itemName} from ${listUuid}: ${e.message}`)
    }
  }

  /**
   *   Remove the image from your item
   *
   *   @param itemUuid The itemUUID you want to remove the image from
   *   returns an empty string and answerHttpStatus should contain 204. If not -> error
   */
  async removeItemImage(itemUuid: string): Promise<string> {
    try {
      const response = await fetch(`${this.url}bringlistitemdetails/${itemUuid}/image`, {
        method: "DELETE",
        headers: this.headers,
      })
      return await response.text()
    } catch (e: any) {
      throw new Error(`Cannot remove item image ${itemUuid}: ${e.message}`)
    }
  }

  /**
   *   move an item to recent items list
   *
   *   @param itemName Name of the item you want to delete from you shopping list
   *   @param listUuid The lisUUID you want to receive a list of users from.
   *   should return an empty string and $answerHttpStatus should contain 204. If not -> error
   */
  async moveToRecentList(listUuid: string, itemName: string): Promise<string> {
    try {
      const response = await fetch(`${this.url}bringlists/${listUuid}`, {
        method: "PUT",
        headers: this.putHeaders,
        body: new URLSearchParams({
          purchase: "",
          recently: itemName,
          specification: "",
          remove: "",
        }),
      })
      return await response.text()
    } catch (e: any) {
      throw new Error(`Cannot remove item ${itemName} from ${listUuid}: ${e.message}`)
    }
  }

  /**
   *   Get all users from a shopping list
   *
   *   @param listUuid The listUUID you want to receive a list of users from
   */
  async getAllUsersFromList(listUuid: string): Promise<GetAllUsersFromListResponse> {
    try {
      const response = await fetch(`${this.url}bringlists/${listUuid}/users`, { headers: this.headers })
      const data = await response.json()
      return getAllUsersFromListResponseSchema.parse(data)
    } catch (e: any) {
      throw new Error(`Cannot get users from list: ${e.message}`)
    }
  }

  /**
   * Get the user settings
   */
  async getUserSettings(): Promise<GetUserSettingsResponse> {
    try {
      const response = await fetch(`${this.url}bringusersettings/${this.uuid}`, { headers: this.headers })
      const data = await response.json()
      return getUserSettingsResponseSchema.parse(data)
    } catch (e: any) {
      throw new Error(`Cannot get user settings: ${e.message}`)
    }
  }

  /**
   *   Load translation file e. g. via 'de-DE'
   *   @param locale from which country translations will be loaded
   */
  async loadTranslations(locale: string): Promise<Record<string, string>> {
    try {
      const response = await fetch(`https://web.getbring.com/locale/articles.${locale}.json`)
      const data = await response.json()
      return z.record(z.string()).parse(data)
    } catch (e: any) {
      throw new Error(`Cannot get translations: ${e.message}`)
    }
  }

  /**
   *   Load translation file e. g. via 'de-DE'
   *   @param locale from which country translations will be loaded
   */
  async loadCatalog(locale: string): Promise<LoadCatalogResponse> {
    try {
      const response = await fetch(`https://web.getbring.com/locale/catalog.${locale}.json`)
      const data = await response.json()
      return loadCatalogResponseSchema.parse(data)
    } catch (e: any) {
      throw new Error(`Cannot get catalog: ${e.message}`)
    }
  }

  /**
   *   Get pending invitations
   */
  async getPendingInvitations(): Promise<GetPendingInvitationsResponse> {
    try {
      const response = await fetch(`${this.url}bringusers/${this.uuid}/invitations?status=pending`, {
        headers: this.headers,
      })
      const data = await response.json()
      return getPendingInvitationsResponseSchema.parse(data)
    } catch (e: any) {
      throw new Error(`Cannot get pending invitations: ${e.message}`)
    }
  }
}
