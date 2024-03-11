export const cleanupProps = (o: any, propRegex: RegExp, collectionProp: string): any => {
  if (typeof o !== "object") {
    return o
  } else {
    const collection: any = {}
    const newO: any = {}
    for (const [key, value] of Object.entries(o)) {
      const res = key.match(propRegex)
      if (res !== null) {
        const newKey = res[1]!
        collection[newKey] = value
      } else {
        newO[key] = o[key]
      }
    }
    return { [collectionProp]: collection, ...newO }
  }
}
