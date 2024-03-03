import { pcov } from "./generated/anylist"
import { v4 as uuidv4 } from "uuid"

export type AnylistClinet = Awaited<ReturnType<typeof anylistClient>>

const formData = (data: Record<string, string>): FormData => {
  const form = new FormData()
  for (const [key, value] of Object.entries(data)) {
    form.append(key, value)
  }
  return form
}

export const anylistClient = async (
  endpoint: string,
  accessToken: string,
  userId: string,
  baseHeaders: Record<string, string>
) => {
  const clientId = "3517E595-B368-49D4-AD2D-5C6464A32619"
  const headers = {
    "X-AnyLeaf-Client-Identifier": clientId,
    authorization: `Bearer ${accessToken}`,
    ...baseHeaders,
  }

  let userDataResponse: pcov.proto.PBUserDataResponse | null = null
  const getUserData = async (refresh = false) => {
    if (userDataResponse && !refresh) {
      return userDataResponse
    } else {
      const response = await fetch(`${endpoint}data/user-data/get`, { method: "POST", headers })
      userDataResponse = pcov.proto.PBUserDataResponse.decode(new Uint8Array(await response.arrayBuffer()))
      return userDataResponse
    }
  }

  const opertationMetadata = (hanlderId: string): pcov.proto.PBOperationMetadata => {
    const metadata = new pcov.proto.PBOperationMetadata()
    metadata.operationId = uuidv4()
    metadata.userId = userId
    metadata.handlerId = hanlderId
    return metadata
  }

  return {
    allItems: async (): Promise<pcov.proto.IListItem[]> => {
      const userData = await getUserData()
      return userData.shoppingListsResponse?.newLists?.map((list) => list.items ?? []).flat() ?? []
    },
    uncrossListItems: async (listId: string, itemIds: string[]) => {
      const operation = new pcov.proto.PBListOperation()

      operation.metadata = opertationMetadata("bulk-uncross-list-items")
      operation.listId = listId

      const list = new pcov.proto.ShoppingList()
      list.identifier = listId
      list.items = itemIds.map((itemId) => {
        const item = new pcov.proto.ListItem()
        item.identifier = itemId
        item.checked = false
        item.listId = listId
        return item
      })
      operation.list = list

      const encodedOperation = pcov.proto.PBListOperation.encode(operation).finish()

      await fetch(`${endpoint}data/shopping-list/operation`, {
        method: "POST",
        headers,
        body: formData({ operations: Buffer.from(encodedOperation).toString("ascii") }),
      })
    },
  }
}
