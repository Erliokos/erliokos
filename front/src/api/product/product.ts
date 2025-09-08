import type { AxiosResponse } from "axios"
import client from "../client"
import type { Product } from "../types"


export const getProducts = (): Promise<AxiosResponse<Product[]>> => {
  return client.get('/products')
}

