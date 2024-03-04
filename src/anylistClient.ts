import { pcov } from "./generated/anylist"
import * as uuid from "uuid"

export type AnylistClient = Awaited<ReturnType<typeof anylistClient>>

const miniUuid = () => uuid.v4().replace(/-/g, "")

const formData = (data: Record<string, string | { blob: Blob; filename: string }>): FormData => {
  const form = new FormData()
  for (const [key, value] of Object.entries(data)) {
    if (typeof value === "string") {
      form.append(key, value)
    } else {
      form.append(key, value.blob, value.filename)
    }
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
    newLists: async (): Promise<pcov.proto.IShoppingList[]> => {
      const userData = await getUserData()
      return userData.shoppingListsResponse?.newLists ?? []
    },
    getCategories: async (): Promise<pcov.proto.IPBUserCategory[]> => {
      const userData = await getUserData()
      return userData.userCategoriesResponse?.categories ?? []
    },
    setListItemChecked: async (listId: string, itemId: string, checked: boolean) => {
      const operation = new pcov.proto.PBListOperation({
        metadata: opertationMetadata("set-list-item-checked"),
        listId: listId,
        listItemId: itemId,
        updatedValue: checked ? "y" : "n",
      })

      const operationList = new pcov.proto.PBListOperationList({ operations: [operation] })

      const encodedOperationList = pcov.proto.PBListOperationList.encode(operationList).finish()

      await fetch(`${endpoint}data/shopping-lists/update`, {
        method: "POST",
        headers,
        body: operationsFormData(new Blob([encodedOperationList])),
      })
    },
    addItem: async (listId: string, item: Omit<pcov.proto.IListItem, "identifier">): Promise<string> => {
      const itemId = miniUuid()

      const operation = new pcov.proto.PBListOperation({
        metadata: opertationMetadata("add-shopping-list-item"),
        listId: listId,
        listItemId: itemId,
        listItem: new pcov.proto.ListItem({
          identifier: itemId,
          userId,
          listId: listId,
          ...item,
        }),
      })

      const operationList = new pcov.proto.PBListOperationList({ operations: [operation] })

      const encodedOperationList = pcov.proto.PBListOperationList.encode(operationList).finish()

      await fetch(`${endpoint}data/shopping-lists/update`, {
        method: "POST",
        headers,
        body: operationsFormData(new Blob([encodedOperationList])),
      })

      return itemId
    },
    updateImage: async (listId: string, itemId: string, imageId: string) => {
      const operation = new pcov.proto.PBListOperation({
        metadata: opertationMetadata("set-list-item-photo-id"),
        listId: listId,
        listItemId: itemId,
        updatedValue: imageId,
        originalValue: "",
      })

      const operationList = new pcov.proto.PBListOperationList({ operations: [operation] })

      const encodedOperationList = pcov.proto.PBListOperationList.encode(operationList).finish()

      await fetch(`${endpoint}data/shopping-lists/update`, {
        method: "POST",
        headers,
        body: operationsFormData(new Blob([encodedOperationList])),
      })
    },
    uploadImage: async (image: Blob): Promise<string> => {
      const imageId = miniUuid()
      const response = await fetch(`${endpoint}data/photos/upload`, {
        method: "POST",
        headers,
        body: formData({ filename: `${imageId}.jpg`, photo: { blob: image, filename: "image.jpg" } }),
      })
      if (response.status !== 200) {
        throw new Error(`Failed to upload image: ${response.status}`)
      }
      return imageId
    },
  }
}
