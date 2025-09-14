export interface CartProduct {
  id: number
  title: string
  price: number
  image: string
  type?: string
  size?: number
  pizzaCount: number
  key: string
  props?: CartProduct
}


export interface PizzaProps {
  id: number
  title: string
  imageUrl: string
  price: number
  sizes: number[]
  types: (0 | 1)[]   // можно уточнить как (0 | 1)[]
}