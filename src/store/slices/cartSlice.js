import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  totalPrice: 0,
  products: []
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProduct: (state, action) => {
      state.products.push(action.payload)
    },
    removeProduct: (state, action) => {
      state.products.filter(product => product.id !== action.payload)
    },
    clearProducts: state => {
      state.products = []
    }
  }
})

export const { addProduct, removeProduct, clearProducts } = cartSlice.actions

export default cartSlice.reducer