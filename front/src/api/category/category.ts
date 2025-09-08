import type { AxiosResponse } from "axios"
import client from "../client"
import type { Category } from "../types"


export const getCategories = (): Promise<AxiosResponse<Category[]>> => {
  return client.get('/categories')
}
