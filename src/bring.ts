import bringApi from "bring-shopping"

export type BringDetailedItem = Awaited<ReturnType<typeof bringApi.prototype.getItemsDetails>>[number]
export type BringItem = Awaited<ReturnType<typeof bringApi.prototype.getItems>>["purchase"][number]
export type BringList = Awaited<ReturnType<typeof bringApi.prototype.loadLists>>["lists"][number]
