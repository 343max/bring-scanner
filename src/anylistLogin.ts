import { z } from "zod"
import { anylistClient } from "./anylistClient"

const formData = (data: Record<string, string>): FormData => {
  const form = new FormData()
  for (const [key, value] of Object.entries(data)) {
    form.append(key, value)
  }
  return form
}

const authSchema = z.object({
  user_id: z.string(),
  refresh_token: z.string(),
  access_token: z.string(),
  is_premium_user: z.boolean(),
})

export const anylistLogin = async (
  auth: { email: string; password: string },
  { endpoint } = { endpoint: "https://www.anylist.com/" }
) => {
  const headers = {
    "X-AnyLeaf-API-Version": "3",
  }

  const response = await fetch(`${endpoint}auth/token`, {
    method: "POST",
    headers: headers,
    body: formData(auth),
  })

  const { access_token, user_id } = authSchema.parse(await response.json())

  return anylistClient(endpoint, access_token, user_id, headers)
}
