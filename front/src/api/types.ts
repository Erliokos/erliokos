
export type Category = {
  id: string
  link: string
  name: string,
}

export type Product = {
  id: string,
  category_id: string,
  category_link: string,
  name: string
  price: number
  sale: number
  images: string[]
  description: string
  rating: number
  vote_count: number
  remains: number
  model: string
}

export interface LoginData {
  username: string;
  password: string;
}

export interface RegisterData {
  password: string;
  username: string;
}

export interface User {
  id: string;
  username: string;
}

export interface AuthResponse {
  user: User;
  accessToken?: string;
}

