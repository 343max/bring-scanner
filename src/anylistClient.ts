import { pcov } from "./generated/anylist"
import * as uuid from "uuid"

export type AnylistClinet = Awaited<ReturnType<typeof anylistClient>>

const miniUuid = () => uuid.v4().replace(/-/g, "")

const formData = (data: Record<string, string | Blob>): FormData => {
  const form = new FormData()
  for (const [key, value] of Object.entries(data)) {
    form.append(key, value)
  }
  return form
}

const operationsFormData = (operations: Blob, key = "operations") => {
  const form = new FormData()
  form.append(key, operations, "")
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
    return new pcov.proto.PBOperationMetadata({
      operationId: miniUuid(),
      userId,
      handlerId,
    })
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

      const operationList = new pcov.proto.PBListOperationList()
      operationList.operations = [operation]

      const encodedOperationList = pcov.proto.PBListOperationList.encode(operationList).finish()

      await fetch(`${endpoint}data/shopping-lists/update`, {
        method: "POST",
        headers,
        body: operationsFormData(new Blob([encodedOperationList])),
      })
    },
    addItem: async (listId: string, eanCode: string) => {
      const itemId = miniUuid()

      const operation = new pcov.proto.PBListOperation({})
      operation.metadata = opertationMetadata("add-shopping-list-item")
      operation.listId = listId
      operation.listItemId = listId
      // operation.listItem = new pcov.proto.ListItem({})
    },

    uploadImage: async (image: Blob): Promise<string> => {
      const imageId = miniUuid()
      const response = await fetch(`${endpoint}data/photos/upload`, {
        method: "POST",
        headers,
        body: formData({ filename: imageId, file: image }),
      })
      if (response.status !== 200) {
        throw new Error(`Failed to upload image: ${response.status}`)
      }
      return imageId
    },
  }
}
