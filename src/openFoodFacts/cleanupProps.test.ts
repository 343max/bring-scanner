import { cleanupProps } from "./cleanupProps"

describe("cleanupProps", () => {
  test("cleanupProps", () => {
    const o = { a: "foo", prefix_foo: "bing", prefix_bar: "bong" }
    const newO = cleanupProps(o, /^prefix_(.+)$/, "collected")
    expect(newO).toEqual({ a: "foo", collected: { foo: "bing", bar: "bong" } })
  })

  test("cleanupProps common prefix", () => {
    const o = { a: "foo", prefix_foo: "bing", prefix_bar: "bong" }
    const newO = cleanupProps(o, /^prefix_(.+)$/, "prefix_collected")
    expect(newO).toEqual({ a: "foo", prefix_collected: { foo: "bing", bar: "bong" } })
  })
})
