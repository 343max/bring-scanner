import { pcov } from "./generated/anylist"
import * as uuid from "uuid"

export type AnylistClinet = Awaited<ReturnType<typeof anylistClient>>

const miniUuid = () => uuid.v4().replace(/-/g, "")

const formData = (data: Record<string, string | Blob>): FormData => {
  const form = new FormData()
  for (const [key, value] of Object.entries(data)) {
    if (typeof value === "string") {
      form.append(key, value)
    } else {
      form.append(key, value, "")
    }
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
    "If-Modified-Since": "Sat, 1 Jan 2005 00:00:00 GMT",
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

  const opertationMetadata = (handlerId: string): pcov.proto.PBOperationMetadata => {
    const metadata = new pcov.proto.PBOperationMetadata()
    metadata.operationId = miniUuid()
    // metadata.operationId = "5c710214c02040488d6f42cf81d81741"
    metadata.userId = userId
    metadata.handlerId = handlerId
    console.log(metadata.operationId)
    return metadata
  }

  return {
    allItems: async (): Promise<pcov.proto.IListItem[]> => {
      const userData = await getUserData()
      return userData.shoppingListsResponse?.newLists?.map((list) => list.items ?? []).flat() ?? []
    },
    setListItemChecked: async (listId: string, itemId: string, checked: boolean) => {
      const operation = new pcov.proto.PBListOperation()

      operation.metadata = opertationMetadata("set-list-item-checked")
      operation.listId = listId
      operation.listItemId = itemId
      operation.updatedValue = checked ? "y" : "n"

      // const encodedOperation = pcov.proto.PBListOperation.encode(operation).finish()

      const operationList = new pcov.proto.PBListOperationList()
      operationList.operations = [operation]

      const encodedOperationList = pcov.proto.PBListOperationList.encode(operationList).finish()

      const operationsString = Buffer.from(encodedOperationList).toString("binary").replace("Â¤", "¤")
      console.log(operationsString)

      await fetch(`${endpoint}data/shopping-lists/update`, {
        method: "POST",
        headers,
        body: formData({ operations: new Blob([encodedOperationList]) }),
      })
    },
  }
}
