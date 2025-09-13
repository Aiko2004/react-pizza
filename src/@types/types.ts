export interface CartProduct {
  id: number
  title: string
  price: number
  image: string
  type: string
  size: number
  pizzaCount: number
  key: string
  props?: CartProduct
}
