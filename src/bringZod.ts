import { z } from "zod"

export type BringOptions = {
  mail: string
  password: string
  url?: string
  uuid?: string
}

export const loginResponse = z.object({
  name: z.string(),
  uuid: z.string(),
  access_token: z.string(),
  refresh_token: z.string(),
})

export const getItemsResponseEntrySchema = z.object({
  specification: z.string(),
  name: z.string(),
})

export type GetItemsResponseEntry = z.infer<typeof getItemsResponseEntrySchema>

export const getItemsResponseSchema = z.object({
  uuid: z.string(),
  status: z.string(),
  purchase: z.array(getItemsResponseEntrySchema),
  recently: z.array(getItemsResponseEntrySchema),
})

export type GetItemsResponse = z.infer<typeof getItemsResponseSchema>

export const getAllUsersFromListEntrySchema = z.object({
  publicUuid: z.string(),
  name: z.string(),
  email: z.string(),
  photoPath: z.string(),
  pushEnabled: z.boolean(),
  plusTryOut: z.boolean(),
  country: z.string(),
  language: z.string(),
})

export type GetAllUsersFromListEntry = z.infer<typeof getAllUsersFromListEntrySchema>

export const getAllUsersFromListResponseSchema = z.object({
  users: z.array(getAllUsersFromListEntrySchema),
})

export type GetAllUsersFromListResponse = z.infer<typeof getAllUsersFromListResponseSchema>

export const loadListsEntrySchema = z.object({
  listUuid: z.string(),
  name: z.string(),
  theme: z.string(),
})

export type LoadListsEntry = z.infer<typeof loadListsEntrySchema>

export const loadListsResponseSchema = z.object({
  lists: z.array(loadListsEntrySchema),
})

export type LoadListsResponse = z.infer<typeof loadListsResponseSchema>

export const getItemsDetailsEntrySchema = z.object({
  uuid: z.string(),
  itemId: z.string(),
  listUuid: z.string(),
  userIconItemId: z.string(),
  userSectionId: z.string(),
  assignedTo: z.string(),
  imageUrl: z.string(),
})

export type GetItemsDetailsEntry = z.infer<typeof getItemsDetailsEntrySchema>

export const userSettingsEntrySchema = z.object({
  key: z.string(),
  value: z.string(),
})

export type UserSettingsEntry = z.infer<typeof userSettingsEntrySchema>

export const userListSettingsEntrySchema = z.object({
  listUuid: z.string(),
  usersettings: z.array(userSettingsEntrySchema),
})

export type UserListSettingsEntry = z.infer<typeof userListSettingsEntrySchema>

export const getUserSettingsResponseSchema = z.object({
  userSettings: z.array(userSettingsEntrySchema),
  userlistsettings: z.array(userListSettingsEntrySchema),
})

export type GetUserSettingsResponse = z.infer<typeof getUserSettingsResponseSchema>

export const catalogItemsEntrySchema = z.object({
  itemId: z.string(),
  name: z.string(),
})

export type CatalogItemsEntry = z.infer<typeof catalogItemsEntrySchema>

export const catalogSectionsEntrySchema = z.object({
  sectionId: z.string(),
  name: z.string(),
  items: z.array(catalogItemsEntrySchema),
})

export type CatalogSectionsEntry = z.infer<typeof catalogSectionsEntrySchema>

export const loadCatalogResponseSchema = z.object({
  language: z.string(),
  catalog: z.object({
    sections: z.array(catalogSectionsEntrySchema),
  }),
})

export type LoadCatalogResponse = z.infer<typeof loadCatalogResponseSchema>

export const getPendingInvitationsResponseSchema = z.object({
  invitations: z.array(z.unknown()),
})

export type GetPendingInvitationsResponse = z.infer<typeof getPendingInvitationsResponseSchema>

export const itemDetailsResponseSchema = z.object({
  uuid: z.string(),
  itemId: z.string(),
  listUuid: z.string(),
  userIconItemId: z.string(),
  userSectionId: z.string(),
  assignedTo: z.string(),
  imageUrl: z.string(),
})

export type ItemDetailsResponse = z.infer<typeof itemDetailsResponseSchema>
