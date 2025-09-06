import { createSlice } from '@reduxjs/toolkit'

const defaultProducts = []

// helpers
const calcTotalPrice = (products) =>
  products.reduce((sum, product) => sum + (product.price || 0) * (product.pizzaCount || 0), 0)

const calcTotalCount = (products) =>
  products.reduce((sum, product) => sum + (product.pizzaCount || 0), 0)

// unique key builder
const makeKey = ({ id, size, type }) => `${id}_${size ?? 'd'}_${type ?? 'd'}`

// localStorage helpers: сохраняем только products
const loadProducts = () => {
  try {
    const raw = localStorage.getItem('cart_products')
    return raw ? JSON.parse(raw) : defaultProducts
  } catch {
    return defaultProducts
  }
}
const saveProducts = (products) => {
  try {
    localStorage.setItem('cart_products', JSON.stringify(products))
  } catch {}
}

const initialProducts = loadProducts()
const initialState = {
  products: initialProducts,
  totalPrice: calcTotalPrice(initialProducts),
  totalCount: calcTotalCount(initialProducts),
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProduct: (state, action) => {
      const payload = action.payload // expects {id, title, price, image, size, type, ...}
      const key = makeKey(payload)
      const existing = state.products.find((p) => p.key === key)

      if (existing) {
        existing.pizzaCount++
      } else {
        state.products.push({
          ...payload,
          key,
          pizzaCount: 1,
        })
      }

      state.totalPrice = calcTotalPrice(state.products)
      state.totalCount = calcTotalCount(state.products)
      saveProducts(state.products)
    },

    // payload can be either key string or {id,size,type}
    incrementProduct: (state, action) => {
      const raw = action.payload
      const key = typeof raw === 'string' ? raw : makeKey(raw)
      const item = state.products.find((p) => p.key === key)
      if (item) {
        item.pizzaCount++
      }
      state.totalPrice = calcTotalPrice(state.products)
      state.totalCount = calcTotalCount(state.products)
      saveProducts(state.products)
    },

    decrementProduct: (state, action) => {
      const raw = action.payload
      const key = typeof raw === 'string' ? raw : makeKey(raw)
      const item = state.products.find((p) => p.key === key)
      if (item) {
        if (item.pizzaCount > 1) {
          item.pizzaCount--
        } else {
          state.products = state.products.filter((p) => p.key !== key)
        }
      }
      state.totalPrice = calcTotalPrice(state.products)
      state.totalCount = calcTotalCount(state.products)
      saveProducts(state.products)
    },

    removeProduct: (state, action) => {
      const raw = action.payload
      const key = typeof raw === 'string' ? raw : makeKey(raw)
      const item = state.products.find((p) => p.key === key)
      if (item) {
        // удалить позицию и пересчитать
        state.products = state.products.filter((p) => p.key !== key)
      }
      state.totalPrice = calcTotalPrice(state.products)
      state.totalCount = calcTotalCount(state.products)
      saveProducts(state.products)
    },

    clearProducts: (state) => {
      state.products = []
      state.totalPrice = 0
      state.totalCount = 0
      saveProducts(state.products)
    },
  },
})

export const { addProduct, incrementProduct, decrementProduct, removeProduct, clearProducts } = cartSlice.actions
export default cartSlice.reducer